import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { initialDataChart } from '../../overview/employeePerformance/dataparse';
import { useSelector } from 'react-redux';

const Analysis = () => {
	const [chartData, setChartData] = useState(initialDataChart);
	const performance = useSelector((state) => state.performanceReducer.employeePerformance);
	const [haveValueChart, setHaveValueChart] = useState(false);

	useEffect(() => {
		if (performance?.data) {
			const _data = {
				// labels: ['Tạm hoãn', 'Đang xử lý', 'Đã hoàn thành'],
				datasets: [
					{
						data: [
							performance?.data ? performance?.data?.job_pending : 100,
							performance?.data ? performance?.data?.job_incomplete : 100,
							performance?.data ? performance?.data?.job_complete : 100,
						],
						backgroundColor: ['#FF6600', '#3564DB', '#3EC180'],
						hoverBackgroundColor: ['#FF6600', '#3564DB', '#3EC180'],
					},
				],
			};
			setChartData(_data);
		}
	}, [setChartData, performance]);

	useEffect(()=>{
		if(chartData?.datasets?.[0]?.data){
			const totalValue =  chartData?.datasets?.[0]?.data.reduce((acc,item)=>{
				return acc += item
			},0)
	
			if(totalValue > 0){
				setHaveValueChart(true)
			}else{
				setHaveValueChart(false)
			}
		}
	},[chartData])

	return (
		<div className='grid'>
			<div className='field col-6 md:col-6 mb-0'>
				<Chart type='doughnut' data={chartData} className='chart_donut mr-0' />
			</div>
			<div className='field col-6 md:col-6 mb-0'>
				{
					haveValueChart && 
					<div className="flex justify-content-center h-full flex-column">
						<div className="chart__dot complete flex align-items-center">Đã hoàn thành</div>
						<div className="chart__dot not-complete flex align-items-center">Chưa hoàn thành</div>
						<div className="chart__dot processing flex align-items-center">Đang xử lý</div>
						<div className="chart__bonus" >
							<p>Số tiền bonus: <span>132$</span> </p>
							<p>Tổng doanh thu:	<span>132$</span> </p>
						</div>
					</div>
				}
			</div>
		</div>
	);
};

export default Analysis;
