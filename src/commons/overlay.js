export const overlay = {
	disable: () => {
		document.body.style.overflow = 'hidden';
		document.body.scroll = 'no';
	},
	enable: () => {
		document.body.style.overflow = 'auto';
		document.body.scroll = 'yes';
	},
};
