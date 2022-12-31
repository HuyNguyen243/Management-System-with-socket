import React, { useRef, useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { setIsOpenModalInformationPayment} from '../../redux/modal/modalSlice';
import copy from "copy-to-clipboard";
import { toastMsg } from '../../commons/toast';
import { formatVND } from '../../commons/formatCost';
import { Dropdown } from 'primereact/dropdown';
import { PayRules } from '../../constants';
import { updatePayRequest } from '../../redux/payment/actionPay';
import { overlay } from '../../commons/overlay';

const InformationPayment = () => {
    const isOpenModalInformationPayment = useSelector(state => state.modal.isOpenModalInformationPayment)
    const dataModalInformationPayment = useSelector(state => state.modal.dataModalInformationPayment?.data)
    const index = useSelector(state => state.modal.dataModalInformationPayment?.index)
    const paymentUpdate = useSelector(state => state.payment.updatepay)
    const dispatch = useDispatch()
    const toast = useRef(null);
    const [status,setStatus] = useState(null)

    useEffect(()=>{
        if(isOpenModalInformationPayment){
            overlay.disable()
        }else{
            overlay.enable()
        }
    },[isOpenModalInformationPayment])
    
    useEffect(()=>{
        if(paymentUpdate?.data){
            dispatch(setIsOpenModalInformationPayment(false))
            toastMsg.success(toast, 'thay đổi trạng thái thanh toán thành công')
        }else if(paymentUpdate?.error){
            toastMsg.error(toast, 'thay đổi trạng thái thanh toán thất bại')
        }
    },[dispatch, paymentUpdate])


    const resetModal = React.useCallback(() => {
        dispatch(setIsOpenModalInformationPayment(false))
    }, [dispatch])

    useEffect(()=>{
        if(dataModalInformationPayment && dataModalInformationPayment?.status_pay){
            setStatus(dataModalInformationPayment?.status_pay)
        }
    },[dataModalInformationPayment])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(status !== dataModalInformationPayment?.status_pay){
            const newPay = Object.assign({}, dataModalInformationPayment,{
                status: status
            })

            const req =  {
                data: { status: status, id_job: dataModalInformationPayment.id_job, id_staff: dataModalInformationPayment.staff_is_pay },
                id: dataModalInformationPayment?.id_system,
                result: {index :index, data: newPay}
            }
            dispatch(updatePayRequest(req))
        }
    };

    const copyToClipboard = (code) => {
        toastMsg.success(toast, 'Sao chép mã thành công')
        copy(code);
    }

    const payDropdown = [
        {name: "Thanh toán" , code: PayRules.STATUS.PAID},
        {name: "Chưa thanh toán" , code: PayRules.STATUS.UNPAID},
        {name: "Hủy bỏ" , code: PayRules.STATUS.CANCEL},
    ];

    return (
        <>
            <ConfirmPopup />
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenModalInformationPayment} position="right" onHide={resetModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title flex justify-content-between" style={{ marginRight: "10px" }}>
                        <h2>Thông tin thanh toán </h2>
                    </div>
                    <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit}>
                        <div className="btn_modal field col-12 md:col-12  grid">
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">Mã công việc :</span>
                                <span className="p-float-label mt-3 flex cursor__normal">
                                    <span className='font-bold mt-1 pr-3 block'>{dataModalInformationPayment?.id_job}</span>
                                    <img src="images/copy.svg" alt="" label="Bottom Right" onClick={()=>copyToClipboard(dataModalInformationPayment?.id_job)} className="cursor-pointer" />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">Mã thanh toán :</span>
                                <span className="p-float-label mt-3 flex cursor__normal">
                                    <span className='font-bold mt-1 pr-3 block'>{dataModalInformationPayment?.staff_is_pay}</span>
                                    <img src="images/copy.svg" alt="" label="Bottom Right" onClick={()=>copyToClipboard(dataModalInformationPayment?.staff_is_pay)} className="cursor-pointer" />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">Chức vụ:</span>
                                <span className="p-float-label mt-3 flex cursor__normal">
                                    <span className='font-bold mt-1 pr-3 block'>{dataModalInformationPayment?.pay_role}</span>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">thanh toán:</span>
                                <span className="p-float-label mt-3 flex cursor__normal">
                                    <span className='font-bold mt-1 pr-3 block'>{formatVND(dataModalInformationPayment?.pay_employees)}</span>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">trạng thái:</span>
                                <Dropdown
                                    options={payDropdown}
                                    optionLabel="name"
                                    optionValue="code"
                                    value={status}
                                    onChange={(e) => { setStatus(e.value)}}
                                    placeholder =" Chọn thanh toán "
                                />
                            </div>
                        </div>
                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" type="button" onClick={resetModal} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Cập nhật" className="p-button-outlined p-button-secondary confirm--btn" type="submit" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </Sidebar>
        </>
    )
}

export default InformationPayment