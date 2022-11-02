import React,{useRef} from 'react'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import copy from "copy-to-clipboard"; 

const InformationJobs = ({isOpenInformationJob, setIsOpenInformationJob}) => {
    const toast = useRef(null);
    const copyToClipboard = () => {
        toast.current.show({severity:'success', detail:'Copy success', life: 1000});
        copy("any text");
    }
  return (
    <Sidebar visible={isOpenInformationJob} position="right" onHide={() => setIsOpenInformationJob(false)} className="create__job">
        <Toast ref={toast} position="bottom-right"/>
        <div className="information__job">
            <div className="creat__job--title">
                <h2>Thông tin công việc </h2>
            </div>
            <form className=" grid modal__creat--job no_flex" >
                <div className="field col-12 md:col-12 grid">
                    <div className="field col-12 md:col-6">
                        <span className="information_job_title">Mã khách hàng :</span>
                        <span className="p-float-label flex-space-between">
                            <span>12345.C.6789</span>
                            <img src="images/copy.svg" alt="" label="Bottom Right" onClick={copyToClipboard}/>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="information_job_title">Mã công việc :</span>
                        <span className="p-float-label flex-space-between">
                            <span>12345.J.6789</span>
                            <img src="images/copy.svg" alt="" label="Bottom Right" onClick={copyToClipboard}/>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="information_job_title ">Trạng thái công việc :</span>
                        <span className="p-float-label align-items-center flex">
                            <img src="images/icon_success.svg" alt=""/>
                            <span>Đang yêu cầu</span>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="information_job_title">Yêu cầu công việc :</span>
                        <span className="p-float-label">
                            <span>Chỉnh sửa tính phí</span>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label flex justify-content-between">
                            <strong className="information_job_title">Loại ảnh :</strong>
                            <span>Model</span>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label flex justify-content-between">
                            <strong className="information_job_title">Số lượng ảnh :</strong>
                            <span>99</span>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label flex justify-content-between">
                            <strong className="information_job_title ">Link ảnh gốc :</strong>
                            <a href="https://www.freecodecamp.org/" target="_blank" rel="noreferrer">link liên kết</a>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label flex justify-content-between">
                            <strong className="information_job_title">Định dạng file :</strong>
                            <span>PSD</span>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6 ">
                        <span className="p-float-label flex justify-content-between">
                            <strong className="information_job_title">Số tiền nhận được :</strong>
                            <span>100.000đ</span>
                        </span>
                    </div>
                    <div className="field col-12 md:col-12">
                        <span className="p-float-label">
                            <span className="information_job_title">Nội dung yêu cầu :</span>
                            <InputTextarea  
                                autoResize 
                                className="aria_content"
                                disabled
                                style={{height:"150px"}}
                            />
                        </span>
                    </div>
                    <div className="field col-12 md:col-12">
                        <span className="p-float-label">
                            <span className="information_job_title">Yêu cầu của khách hàng :</span>
                            <InputTextarea  
                                autoResize 
                                className="aria_note"
                                disabled
                                style={{height:"150px"}}
                            />
                        </span>
                    </div>
                </div>
                <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                    <div className="field col-12 md:col-12">
                        <span className="p-float-label">
                            <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" onClick={()=>{setIsOpenInformationJob(false)} }/>
                        </span>
                    </div>
                 
                </div>
            </form>
        </div>
    </Sidebar>
  )
}

export default InformationJobs