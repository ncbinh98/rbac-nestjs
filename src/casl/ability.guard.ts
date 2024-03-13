import * as Mustache from 'mustache';

import { Reflector } from '@nestjs/core';

import { map, size } from 'lodash';

import { RequiredRule, CHECK_ABILITY } from './abilities.decorator';

import {
  subject,
  RawRuleOf,
  MongoAbility,
  ForcedSubject,
  ForbiddenError,
  createMongoAbility,
} from '@casl/ability';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { connectionSource } from 'src/config/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';

export const actions = [
  'read',
  'create',
  'update',
  'delete',
  'manage',
] as const;

export const subjects = ['Permission', 'Role', 'Story', 'User', 'all'] as const;

export type Abilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
];

export type AppAbility = MongoAbility<Abilities>;

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  createAbility = (rules: RawRuleOf<AppAbility>[]) =>
    createMongoAbility<AppAbility>(rules);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules: any =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const currentUser = context.switchToHttp().getRequest().user;
    const request = context.switchToHttp().getRequest();
    const userPermissions = await connectionSource.manager
      .getRepository(Permission)
      .find({
        where: {
          role: {
            id: currentUser.role.id,
          },
        },
      });

    const parsedUserPermissions = this.parseCondition(
      userPermissions,
      currentUser,
    );

    try {
      const ability = this.createAbility(Object(parsedUserPermissions));
      for await (const rule of rules) {
        let sub = {};

        // Check conditions for each rule
        if (rule?.conditions) {
          //This section requires redesigning to allow for more dynamic conditions...
          const subId = request.params['id'];
          sub = await this.getSubjectById(subId, rule.subject);
        }

        // Check fields for each rule
        if (rule.fields) {
          Object.keys(request.body).forEach((k, v) => {
            ForbiddenError.from(ability)
              // .setMessage('You are not allowed to perform this action')
              .throwUnlessCan(rule.action, subject(rule.subject, sub), k);
          });
        }

        // Check overall rule permission
        ForbiddenError.from(ability)
          .setMessage('You are not allowed to perform this action')
          .throwUnlessCan(rule.action, subject(rule.subject, sub));
      }
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  /**
   * @example
   * convert template field to actual value in conditions
   * eg: conditions: { id: {{id}} } => conditions: { id:  "5d76a536-de0a-4152-8dc2-998a4720a177" }
   */
  parseCondition(permissions: any, currentUser: User) {
    const data = map(permissions, (permission) => {
      if (size(permission.conditions)) {
        const preConds = {};
        Object.keys(permission.conditions).forEach((k, v) => {
          const parsedVal = Mustache.render(
            permission.conditions[k],
            currentUser,
          );
          preConds[k] = parsedVal;
        });

        return {
          ...permission,
          conditions: preConds,
        };
      }
      return permission;
    });
    return data;
  }

  async getSubjectById(id: string, subName: string) {
    const subject = await connectionSource.query(
      `SELECT * from ${String(subName).toLowerCase()} WHERE id = '${id}'`,
    );
    if (!subject) throw new NotFoundException(`${subName} not found`);
    return subject;
  }
}
