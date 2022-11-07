import React from 'react'
import { Calendar } from 'primereact/calendar';
import { addLocale,locale } from 'primereact/api';

const DatePicker = ({dates ,setDates}) => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (prevMonth === 11) ? year - 1 : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (nextMonth === 0) ? year + 1 : year;

    const minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    const maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    locale("vi")
    addLocale('vi', {
        dateFormat: 'dd/mm/yy',
        firstDayOfWeek: 1,
        dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
        dayNamesShort: ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"],
        dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        monthNames: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"],
        monthNamesShort: ["thg 1", "thg 2", "thg 3", "thg 4", "thg 5", "thg 6", "thg 7", "thg 8", "thg 9", "thg 10", "thg 11", "thg 12"],
    });
    
  return (
    <div className="calendar relative ">
        <Calendar id="range" value={dates} onChange={e=>setDates(e.value)} selectionMode="range" placeholder="Select date"/>
        <img src='images/calendar.svg' alt='' className="image__calendar"/>
    </div>
  )
}

export default DatePicker