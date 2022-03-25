

export const glicemyChartFormatter = (glicemyData) =>{

    let chart_data = {
        labels:["",""],
        datasets:
        [
            {
                data:[0,0]
            }
        ]
    }


    if(glicemyData === undefined){
        console.log("UNDEFINED GLICEMY DATA");
        return chart_data;
    } 

    const d = [];
    const l = [];
    
    chart_data.labels = [];
    glicemyData.forEach( elem =>{
        chart_data.labels.push(elem.time.hours);
        d.push(elem.value);
    })

    

    chart_data.datasets = [{data: d}];


    const res = {   
        labels: l,
        datasets: [
            {
            data: d
            }
        ]
    }

    return chart_data;
}
