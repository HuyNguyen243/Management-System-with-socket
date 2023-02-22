export const handleOutSide = (className, state, setState) => {
	const handleClickOutSideNav = (e) => {
		const el = document.querySelector(className);
		if (state && !el?.contains(e.target)) {
			setState(false);
		}
	};

	window.addEventListener('mousedown', handleClickOutSideNav);

	return () => {
		window.removeEventListener('mousedown', handleClickOutSideNav);
	};
};
