import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { table_personal_information } from '../../../components/table/header_table';
import { InputText } from 'primereact/inputtext'; 

const TablePersonalInfor = ({ 
  nameBank, 
  numberAccountPayment, 
  paymentMethod, 
  branch,
  setNameBank,
  setNumberAccountPayment,
  setBranch,
}) => {
  const header = table_personal_information

  const dataTable =[
    {
      paymentMethod: paymentMethod,
      nameBank: nameBank,
      numberAccountPayment: numberAccountPayment,
      branch: branch,
    }
  ]

  const headerTable = (name)=>{
    return(
      <div className="table__header-col" >
        <span className="table__header-name">{name}</span>
      </div>
  )}

  const cellEditor = ( item ) => {
    switch(item){
      case("nameBank"):
        return <InputText type="text" value={nameBank || ""} 
        placeholder="Nhập tên ngân hàng" 
        className="edit_bank" 
        onChange={(e)=>{ setNameBank(e.target.value)} } 
        />;
      case("numberAccountPayment"):
        return <InputText type="text" 
        value={numberAccountPayment || ""} 
        placeholder="Nhập số tài khoản" 
        className="edit_bank" 
        onChange={(e)=>{ setNumberAccountPayment(e.target.value)} } />;
      case("branch"):
        return <InputText 
        type="text" 
        value={branch || ""} 
        placeholder="Nhập chi nhánh ngân hàng" 
        className="edit_bank" 
        onChange={(e)=>{ setBranch(e.target.value)} } />;
      default:
    }
  }

  return (
    <DataTable 
    value={dataTable} 
    responsiveLayout="stack" 
    breakpoint="1200px" 
    className="table__total--workflow--management"
    editMode="cell"
    >
        {
        Object.keys(dataTable[0])?.map((item,index)=>(
            <Column
              key={index}
              body={()=>(<span className="text_table_bank">{dataTable[0]?.[item]}</span>)}
              header={()=>headerTable(header?.[index]?.name)}
              editor={item !=="paymentMethod" ? (options) => cellEditor(item,index): false}
              className="table__total"
            />
        ))
        }
    </DataTable>
  )
}

export default TablePersonalInfor