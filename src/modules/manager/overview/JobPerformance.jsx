import React,{useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';
import { dataBar } from '../../../commons/Charts/Bar';
import { getLightTheme } from '../../../commons/Charts/getLightTheme';


const JobPerformance = () => {
  const [basicData] = useState(dataBar);
  const { basicOptions } = getLightTheme();

  return (
    <div className="page">
      <div className="grid justify-content-around JobPerformance__container">
          <div className="field col-12 md:col-6" style={{paddingTop:"0px"}}>
            <span className="p-float-label JobPerformance__block">
              <div className="card chart__bar">
                  <Chart type="bar" data={basicData} options={basicOptions} />
              </div>        
            </span>
          </div>
          <div className="field col-12 md:col-6">
            <span className="p-float-label JobPerformance__block grid">
                <div className="field col-12 md:col-6 ">
                      <div className="creat__job--title">
                        <h2>Thông tin nhân viên</h2>
                      </div>
                      <div className="information__staff">
                        <span className="jobperformance_title">Họ và tên: </span>
                        <span className="p-float-label">
                            <InputText placeholder="Username" className ="JobPerformance_text"/>
                        </span>
                        <span className="jobperformance_title">Số điện thoại: </span>
                        <span className="p-float-label">
                            <InputText className ="JobPerformance_text" placeholder="Username" 
                            />
                        </span>
                        <span className="jobperformance_title">Chức vụ: </span>
                        <span className="p-float-label">
                            <InputText className ="JobPerformance_text"
                            />
                        </span>
                      </div>
                </div>
                <div className="field col-12 md:col-6 relative">
                    <div className="JobPerformance__avatar">
                        <img src="images/avatar_default.svg" alt="" />
                    </div>
                </div>
            </span>
          </div>
      </div>
    </div>
  )
}

export default JobPerformance