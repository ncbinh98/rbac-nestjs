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
    console.log('@@@currentUser', currentUser);
    const userPermissions = await connectionSource.manager
      .getRepository(Permission)
      .find({
        where: {
          role: {
            id: currentUser.roleId,
          },
        },
      });
    console.log('@@@userPermissions', userPermissions);

    const parsedUserPermissions = this.parseCondition(
      userPermissions,
      currentUser,
    );
    console.log('@@@parsedUserPermissions', parsedUserPermissions);

    try {
      const ability = this.createAbility(Object(parsedUserPermissions));
      console.log('@@@rules', rules);
      for await (const rule of rules) {
        let sub = {};
        if (size(rule?.conditions)) {
          const subId = +request.params['id'];
          sub = await this.getSubjectById(subId, rule.subject);
        }
        console.log(
          '@@@rule.action, subject(rule.subject, sub)',
          rule.action,
          subject(rule.subject, sub),
        );
        console.log('@@@ability', ability);

        ForbiddenError.from(ability)
          .setMessage('You are not allowed to perform this action')
          .throwUnlessCan(rule.action, subject(rule.subject, sub));
      }
      return true;
    } catch (error) {
      console.log('@@@error', error);
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  /* 
    Parse userId to template createdUserId: {{id}}. check permission only owner can edit story
  */
  parseCondition(permissions: any, currentUser: User) {
    const data = map(permissions, (permission) => {
      if (size(permission.conditions)) {
        const parsedVal = Mustache.render(
          permission.conditions['createdUserId'],
          currentUser,
        );
        return {
          ...permission,
          conditions: { createdUserId: parsedVal },
        };
      }
      return permission;
    });
    return data;
  }

  async getSubjectById(id: number, subName: string) {
    const subject = await connectionSource.query(
      `SELECT * from ${String(subName).toLowerCase()} WHERE id = '${id}'`,
    );
    if (!subject) throw new NotFoundException(`${subName} not found`);
    return subject;
  }
}
