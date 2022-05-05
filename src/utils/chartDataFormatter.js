

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


    if(glicemyData === undefined || glicemyData===null){
        console.log("NO GLICEMY DATA");
        return chart_data;
    } 

    const d = [];
    const l = [];

    //The lenght is divided by a fixed variable that will be a counter of the index of time label to add (floor of the division)
    // and the when you reach that index it passes to the next in order to have alway a fixed number of labels

    const numberOfLabels=7;
    const lenght=Object.keys(glicemyData).length-1;
    var len=Math.floor(lenght/numberOfLabels);
    console.log('len '+len)

    var i=0;
    if (len>=1){
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
        
        //chart_data.labels.push(elem.time.hours);
        d.push(elem.value);
    })
}
else
{
    glicemyData.forEach( elem =>{
        
        chart_data.labels.push(elem.time.hours);
        d.push(elem.value);
    })
}
    

    chart_data.datasets = [{data: d}];

    return chart_data;
}
