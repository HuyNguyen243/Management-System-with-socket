import React from 'react'
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const CreateAdmin = ({ isOpenCreateJob, setIsOpenCreateJob }) => {
    const [cities, setCities] = React.useState(null);

    const type_files = [
        { name: 'JPG', code: 'JPG' },
        { name: 'SVG', code: 'RSVGM' },
        { name: 'PSD', code: 'PSD' },
    ];

    const status= [
        { name: 'Đang yêu cầu', code: 'DONE' },
        { name: 'Tạm hoãn yêu cầu', code: 'PENDING' },
        { name: 'Ngưng yêu cầu', code: 'STOP' },
    ]

  return (
    <Sidebar visible={isOpenCreateJob} position="right" onHide={() => setIsOpenCreateJob(false)} className="create__job">
        <div className="creat__job">
            <div className="creat__job--title">
                <h2>Tạo công việc mới</h2>
            </div>
            <div className=" grid">
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <h5>Mã khách hàng : </h5>
                        <InputText id="customer_id " />
                    </span>
                </div>
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <h5>Loại công việc : </h5>
                        <InputText id="type_job" />
                    </span>
                </div>
                <div className="field col-12 md:col-6 create__job--calendar">
                    <span className="p-float-label ">
                        <h5>Ngày hạn chốt công việc : </h5>
                        <Calendar id="calendar"  className="calendar_don"/>
                    </span>
                    <img src="/images/calendar.svg" alt="" className="calendar__image"/>
                </div>
                <div className="field col-12 md:col-3">
                    <span className="p-float-label">
                        <h5>Loại ảnh : </h5>
                        <InputText id="type_image " />
                    </span>
                </div>
                <div className="field col-12 md:col-3 ">
                    <span className="p-float-label">
                        <h5>Số lượng : </h5>
                        <InputText id="original__link " />
                    </span>
                </div> 
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <h5>Link ảnh gốc : </h5>
                        <InputText id="original__link " />
                    </span>
                </div>
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <h5>Loại ảnh : </h5>
                        <Dropdown value={cities} options={type_files} onChange={(e)=>setCities(e.value)} optionLabel="name"  className="create__job_type"/>
                    </span>
                </div>
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <h5>Chi phí : </h5>
                        <InputText id="employees " />
                    </span>
                </div>
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <h5>Trạng thái : </h5>
                        <Dropdown  options={status}  optionLabel="name"  className="create__job_type"/>
                    </span>
                </div>
                <div className="field col-12 md:col-12">
                    <span className="p-float-label">
                        <h5>Nội dung yêu cầu :</h5>
                        <InputTextarea  autoResize className="create__job_area"/>
                    </span>
                </div>
                <div className="field col-12 md:col-12">
                    <span className="p-float-label">
                        <h5>Lưu ý của khách hàng :</h5>
                        <InputTextarea  autoResize  className="create__job_area"/>
                    </span>
                </div>
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <Button label="Primary" className="p-button-outlined cancel--btn" />
                    </span>
                </div>
                <div className="field col-12 md:col-6">
                    <span className="p-float-label">
                        <Button label="Secondary" className="p-button-outlined p-button-secondary confirm--btn" />
                    </span>
                </div>
            </div>
        </div>
    </Sidebar>
  )
}

export default CreateAdmin