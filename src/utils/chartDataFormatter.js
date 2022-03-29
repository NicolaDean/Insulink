

export const glicemyChartFormatter = (glicemyData) =>{

    let chart_data = {
        labels:[],
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

    //The lenght is divided by a fixed variable that will be a counter of the index of time label to add (floor of the division)
    // and the when you reach that index it passes to the next in order to have alway a fixed number of labels

    const numberOfLabels=7;
    var i=0;
    const lenght=Object.keys(glicemyData).length-1;
    var len=Math.floor(Object.keys(glicemyData).length/numberOfLabels);
    console.log('todays number of glycemias '+Object.keys(glicemyData).length)
    glicemyData.forEach( elem =>{
        if(i== 0 || i==lenght ){
            chart_data.labels.push(elem.time.hours);
            i++;
        }
        else if(len==i){
        chart_data.labels.push(elem.time.hours);
        len=len*2;
        i++;
    } else i++;
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