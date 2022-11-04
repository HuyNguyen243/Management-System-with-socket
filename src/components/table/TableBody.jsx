import React from 'react'

const TableBody = (rowData, item) => {
    //btn_success , btn_pending, btn_stop , normal, text-bold ,text-blue

   const HTML = ()=>{
       switch(item){
           default:
            return (
                <span className={`table__body-name `}>{rowData[item]}</span>
            )
       }
   } 
  return (
      <>
        {HTML()}
    </>
  )
}

export default TableBody