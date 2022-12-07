export const dataParse = (data)=>{
    if(data){
        const rs = {
            job_pending: data.job_pending,
            job_incomplete: data.job_incomplete,
            job_complete: data.job_complete,
            cost_jobs: data.cost_jobs,
            bonus: data.bonus,
            kpi: data.kpi,
        }
        return rs
    }else{
        return null
    }
}

export const initialDataChart = {
    datasets: [
        {
            data: [0,0,0],
            backgroundColor: [
                "#FF6384",
                "#FFCE56",
                "#0061F4",
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#FFCE56",
                "#0061F4",
            ]
        }]
}

export const horizontalOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};