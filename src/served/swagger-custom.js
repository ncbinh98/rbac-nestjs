document.addEventListener('DOMContentLoaded', function (event) {
	setTimeout(function () {
		document.querySelectorAll('.opblock-summary').forEach((item) => {
			item.addEventListener('click', function () {
				setTimeout(function () {
					if (item.parentElement.classList.contains('is-open')) {
						setTimeout(function () {
							const buttons =
								item.parentElement.getElementsByClassName('try-out__btn');
							if (buttons.length > 0) {
								buttons[0].addEventListener('click', function () {
									handleTryOutButtonClick(item.parentElement);
								});
							}
						}, 200);
					}
				}, 200);
			});
		});
	}, 1500);
});

function handleTryOutButtonClick(parentElement) {
	setTimeout(function () {
		const executeBtns = parentElement.getElementsByClassName('execute');
		if (executeBtns.length > 0) {
			executeBtns[0].addEventListener('click', function () {
				handleExecuteButtonClick(parentElement);
			});
		}
	}, 200);
}

function handleExecuteButtonClick(parentElement) {
	setTimeout(function () {
		const codeJsonEl = parentElement.getElementsByClassName('language-json');
		if (codeJsonEl.length > 0) {
			codeJsonEl[0].childNodes.forEach((c) => {
				if (isJWT(c.textContent)) {
					const token = JSON.parse(c.textContent);
					window.ui.preauthorizeApiKey('JWT', token);
					localStorage.setItem(
						'authorized',
						`{"JWT":{"name":"JWT","schema":{"scheme":"bearer","bearerFormat":"JWT","type":"http"},"value":"${token}"}}`,
					);
				}
			});
		}
	}, 1000);
}

function isJWT(token) {
	const parts = token.split('.');
	if (parts.length !== 3) {
		return false;
	}

	const decodedPayload = JSON.parse(atob(parts[1]));
	// You may want to perform additional checks on the decoded payload
	// such as expiration time, issuer, etc.
	return true;
}

//Documents to fix error anonymous function call eventlistener : https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
