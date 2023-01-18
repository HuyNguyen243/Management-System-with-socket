import React, { useEffect } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsOpenModalSetting } from '../../redux/modal/modalSlice';
import { InputNumber } from 'primereact/inputnumber';
import { settingRequest, updateRequest } from "../../redux/admin/action";
import { overlay } from '../../commons/overlay';

const Setting = () => {

    const isOpenSetting = useSelector(state => state.modal.isOpenModalSetting)
    const dispatch = useDispatch()
    const setting = useSelector(state => state.setting?.system);
    const user = useSelector(state => state.auth.user)

    const updatestting = useSelector(state => state.setting?.editsystem);
    const { setValue,formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (isOpenSetting) {
            dispatch(settingRequest())
            overlay.disable()
        }else{
            overlay.enable()
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
        }

    }, [updatestting, dispatch, handleCloseModal])

    return (
        <>
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
                                        disabled={true}
                                        inputId="currency-vn"
                                        mode="currency"
                                        currency="VND"
                                        locale="vi-VN"
                                        useGrouping={true}
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