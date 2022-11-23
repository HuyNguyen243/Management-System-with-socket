import React, { useEffect, useRef } from 'react';
import { toastMsg } from '../../commons/toast';

import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsOpenModalSetting } from '../../redux/modal/modalSlice';
import { InputNumber } from 'primereact/inputnumber';
import { settingRequest, updateRequest } from "../../redux/admin/action";
import { Toast } from 'primereact/toast';

const Setting = () => {
    const toast = useRef(null);

    const isOpenSetting = useSelector(state => state.modal.isOpenModalSetting)
    const dispatch = useDispatch()
    const setting = useSelector(state => state.setting?.system);
    const user = useSelector(state => state.auth.user)

    const updatestting = useSelector(state => state.setting?.editsystem);
    const { setValue,formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (isOpenSetting) {
            dispatch(settingRequest())
        }
    }, [isOpenSetting, dispatch])
    const onSubmit = (data) => {
        const formDataPut = {}
        Object.keys(data).forEach(item => {
            if (data[item] !== setting?.data[item]) {
                Object.assign(formDataPut, { [item]: data[item] })
            }
        });
        if (Object.keys(formDataPut).length > 0) {
            Object.assign(formDataPut, { id_system: user?.data?.id_system })
            const formData = {
                data: data,
                result: formDataPut,
                index: setting
            }
            dispatch(updateRequest(formData))
        }
    };

    const handleCloseModal = React.useCallback(() => {
        dispatch(setIsOpenModalSetting(false)); reset()
    }, [dispatch, reset])
    useEffect(() => {
        if (updatestting?.data) {
            handleCloseModal()
            toastMsg.success(toast, 'Cập nhật thành công')
        }

        if (updatestting?.error) {
            toastMsg.error(toast, 'Cập nhật thất bại')
        }
    }, [updatestting, dispatch, handleCloseModal])

    return (
        <>
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenSetting} position="right" onHide={handleCloseModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title">
                        <h2>Cài đặt Hệ thống</h2>
                    </div>
                    <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-12">
                                <span htmlFor="exchange_rate">Tỉ lệ chuyển đổi: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <InputNumber
                                        id="exchange_rate"
                                        value={setting?.data?.exchange_rate}
                                        onValueChange={(e) => setValue("exchange_rate",e.value)}
                                        inputId="currency-vn"
                                        mode="currency"
                                        currency="VND"
                                        locale="vi-VN"
                                        useGrouping={true}
                                        minFractionDigits={0}
                                        className={errors?.exchange_rate && "p-invalid"}

                                    />
                                </span>
                            </div>
                            <div className="field col-12 md:col-12 ">
                                <span htmlFor="rate_sale">Tỉ lệ hoa hồng ( SALER ): <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <InputNumber
                                        id="rate_sale"
                                        value={setting?.data?.rate_sale}
                                        onValueChange={(e) => setValue("rate_sale",e.value)}
                                        suffix="%"
                                        className={errors?.rate_sale && "p-invalid"}
                                    />
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span htmlFor="kpi_sale">KPI SALER: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <InputNumber
                                        id="kpi_sale"
                                        value={setting?.data?.kpi_sale}
                                        onValueChange={(e) => setValue("kpi_sale",e.value)}
                                        inputId="currency-vn"
                                        mode="currency"
                                        currency="VND"
                                        locale="vi-VN"
                                        useGrouping={true}
                                        className={errors?.kpi_sale && "p-invalid"}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn"
                                        onClick={handleCloseModal}
                                    />
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

export default Setting