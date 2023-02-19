function toast({ title = '', message = '', type = 'info', duration = 3000 }) {
	let getBody = document.getElementById('root');
	let createElement = document.createElement('div');

	createElement.setAttribute('id', 'toast');
	getBody.appendChild(createElement);

	const main = document.getElementById('toast');

	if (main) {
		const toast = document.createElement('div');
		// Auto remove Toast
		const AutoRemoveId = setTimeout(() => {
			main.removeChild(toast);
		}, duration + 1000);
		// remove Toast when click
		toast.onclick = function (e) {
			if (e.target.closest('.fa-times')) {
				main.removeChild(toast);
				clearTimeout(AutoRemoveId);
			}
		};
		// set Icon toast
		const icons = {
			success: 'fa fa-check-circle',
			info: 'fa fa-info-circle',
			warning: 'fa fa-exclamation-circle',
			error: 'fa fa-exclamation-circle',
		};

		const icon = icons[type];
		const delay = (duration / 1000).toFixed(2);

		toast.classList.add('toast', `toast--${type}`);
		toast.style.animation = `slideInLeft ease 0.3s ,fadeOut linear 1s ${delay}s forwards`;

		toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa fa-times"></i>
            </div>
        `;
		main.appendChild(toast);
	}
}

const DURATION = 2000;

export function successToast(message) {
	toast({
		title: 'Success',
		message: message,
		type: 'success',
		duration: DURATION,
	});
}

export function errorToast(message) {
	toast({
		title: 'error',
		message: message,
		type: 'error',
		duration: DURATION,
	});
}

export function inforToast(message) {
	toast({
		title: 'infor',
		message: message,
		type: 'infor',
		duration: DURATION,
	});
}
