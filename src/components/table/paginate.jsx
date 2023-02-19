import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

export const paginate = {
	layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
	PrevPageLink: (options) => {
		return (
			<button type='button' className={options.className} onClick={options.onClick} disabled={options.disabled}>
				<span className='p-3'>&lt;</span>
				<Ripple />
			</button>
		);
	},
	NextPageLink: (options) => {
		return (
			<button type='button' className={options.className} onClick={options.onClick} disabled={options.disabled}>
				<span className='p-3'>&gt;</span>
				<Ripple />
			</button>
		);
	},
	PageLinks: (options) => {
		if (
			(options.view.startPage === options.page && options.view.startPage !== 0) ||
			(options.view.endPage === options.page && options.page + 1 !== options.totalPages)
		) {
			const className = classNames(options.className, { 'p-disabled': true });

			return (
				<span className={className} style={{ userSelect: 'none' }}>
					...
				</span>
			);
		}

		return (
			<button type='button' className={options.className} onClick={options.onClick}>
				{options.page + 1}
				<Ripple />
			</button>
		);
	},
	RowsPerPageDropdown: (options) => {
		const dropdownOptions = [
			{ label: 10, value: 10 },
			{ label: 25, value: 25 },
			{ label: 50, value: 50 },
			{ label: 'All', value: options.totalRecords },
		];

		return (
			<Dropdown
				value={options.value}
				options={dropdownOptions}
				onChange={options.onChange}
				className='select__perpage align-items-center'
			/>
		);
	},
};
