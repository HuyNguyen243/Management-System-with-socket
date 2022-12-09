import React,{ useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Analysis from './Analysis';
import { useSelector,useDispatch } from 'react-redux';
import { dataParse , horizontalOptions} from '../../overview/employeePerformance/dataparse';
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import {  kpiYearOfMonth } from "../../../../redux/employeePerformance/action";

const TableTotal = () => {
  const performance = useSelector(state => state.performanceReducer.employeePerformance)
  const dataTable = dataParse(performance?.data)
  const kpisYear = useSelector(state => state.performanceReducer?.kpis)
  const [year, setyear] = useState(null);
  const dispatch = useDispatch()

  const [dataKPis,setDataKPis] = useState({
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [{
        type: 'bar',
        label: 'KPI YEAR',
        backgroundColor: '#0061F4',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
        type: 'bar',
        label: 'default',
        backgroundColor: 'transparent',
        data: [100]
    }
    ]
  });

  const headerTable = (name)=>{
    return(
      <div className="" >
        <span className="">{name}</span>
      </div>
  )}

  const bodyTable = (name)=>{
    return(
      <div>
        <span className="table__body-name">{name}</span>
      </div>
  )}

  useEffect(() => {
    if(kpisYear?.data){
        let data = [0,0,0,0,0,0,0,0,0,0,0,0]
        if(kpisYear?.data.length > 0){
            for(const item of kpisYear?.data){
                let index = (item?.month).split("-")[1]
                data[index - 1] = (item?.kpi).toFixed(0)
            }
        }
        
        setDataKPis({
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [
                {
                    type: 'bar',
                    label: 'KPI YEAR',
                    backgroundColor: '#0061F4',
                    data: data
                },
                {
                    type: 'bar',
                    label: '',
                    backgroundColor: 'transparent',
                    data: [100]
                }
            ]
        },)
    }
  }, [kpisYear])

  	const handleChangeYear = (e)=>{
		setyear(e.value)
		const getYear = new Date(e.value).getFullYear()
		dispatch(kpiYearOfMonth(`?year=${getYear}`))
	}

	const checkData = ()=>{
        if(performance?.data){
            if(performance?.data?.job_pending > 0 || performance?.data?.job_incomplete > 0 ||  performance?.data?.job_complete > 0){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }

  return (
    <div className="grid">
        <DataTable value={[dataTable]} responsiveLayout="stack" breakpoint="1113px" className="table__total--workflow--management field col-12 md:col-12 m-0">
              <Column body={()=>bodyTable(dataTable?.job_pending)} header={()=>headerTable("Tạm hoãn")} className="p-0"/>
              <Column body={()=>bodyTable(dataTable?.job_incomplete)} header={()=>headerTable("Đang xử lý")} />
              <Column body={()=>bodyTable(dataTable?.job_complete)} header={()=>headerTable("Đã hoàn thành")} />
              <Column body={()=>bodyTable(dataTable?.cost_jobs)} header={()=>headerTable("Doanh thu")} />
              <Column body={()=>bodyTable(dataTable?.bonus)} header={()=>headerTable("Bonus")} />
              <Column body={()=>bodyTable(dataTable?.kpi)} header={()=>headerTable("KPI")} />
        </DataTable>
      <div className="field col-12 md:col-7 " >
	  		<Calendar id="yearpicker " className="w-3 calendar__year" value={year} onChange={handleChangeYear} view="year" dateFormat="yy" />
          	<Chart type="bar"  className="chart_bar"  data={dataKPis} options={horizontalOptions}/>
      </div>
	  <div className="table__analysis field col-12 md:col-5">
        <Analysis />
		{
            (performance?.data?.job_pending || performance?.data?.job_incomplete || performance?.data?.job_complete) && checkData 
            ?
            <div className="flex pt-4">
                <div className="field col-4 md:col-4 chart__color red">Tạm hoãn</div>
                <div className="field col-4 md:col-4 chart__color yellow">Đang xử lý</div>
                <div className="field col-4 md:col-4 chart__color blue">Hoàn thành</div>
            </div>
            :
            ""
    	}
      </div>
    </div>
  )
}

export default TableTotal