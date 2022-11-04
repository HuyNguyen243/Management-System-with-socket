import React from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';

const Setting = ({isOpenSetting, setIsOpenSetting}) => {
    const defaultValues = {
        text_1: '',
        text_2: "",
        text_3: "",
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        if(Object.keys(errors).length === 0){
            console.log(data)
            reset();
        }
    };

  return (
    <Sidebar visible={isOpenSetting} position="right" onHide={() => setIsOpenSetting(false)} className="create__job">
        <div className="creat__job">
            <div className="creat__job--title">
                <h2>Cài đặt</h2>
            </div>
            <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                <div className="field col-12 md:col-12 grid">
                    <div className="field col-12 md:col-12">
                        <span htmlFor="autocomplete">Text: <span className="warning">*</span></span>
                        <span className="p-float-label">
                             <Controller name="text_1" 
                                control={control} 
                                rules={{ required: true }} render={({ field, fieldState }) => (
                                <InputText 
                                id={field.name} 
                                {...field}
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                />
                            )} />
                        </span>
                    </div>
                    <div className="field col-12 md:col-12 ">
                        <span htmlFor="withoutgrouping">text 2: <span className="warning">*</span></span>
                        <span className="p-float-label">
                            <Controller name="text_2" 
                                control={control} 
                                rules={{ required: true }} render={({ field, fieldState }) => (
                                <InputText  
                                id={field.name} 
                                {...field}
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                />
                            )} />
                        </span>
                    </div> 
                    <div className="field col-12 md:col-12">
                        <span htmlFor="original__link">text 3: <span className="warning">*</span></span>
                        <span className="p-float-label">
                            <Controller name="text_3" 
                                control={control} 
                                rules={{ required: true }} render={({ field, fieldState }) => (
                                <InputText 
                                id={field.name} 
                                {...field}
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                />
                            )} />
                        </span>
                    </div>
                </div>
                <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" onClick={()=>{setIsOpenSetting(false);reset()} }/>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <Button label="Tạo mới" className="p-button-outlined p-button-secondary confirm--btn" type="submit"/>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    </Sidebar>
  )
}

export default Setting