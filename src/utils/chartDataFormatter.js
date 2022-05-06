

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
        console.log("UNDEFINED GLICEMY DATA");
        return chart_data;
    } 

    const d = [];
    const l = [];

    //The lenght is divided by a fixed variable that will be a counter of the index of time label to add (floor of the division)
    // and the when you reach that index it passes to the next in order to have alway a fixed number of labels

    const numberOfLabels=7;
    const lenght = Object.keys(glicemyData).length-1;
    var len = Math.floor(lenght/numberOfLabels)+1;          //Num of glicemy available
    console.log('todays number of glycemias '+len)   

    var i=0;
    glicemyData.forEach( elem =>{

        //Select only some of the glicemys time, to avoid "overcrowded labels"
        if(( i== 0 || i==lenght || i%len == 0)){  
            chart_data.labels.push(elem.time.hours);
        }
        
        i++;
        d.push(elem.value);
    })

    chart_data.datasets = [{data: d}];


    return chart_data;
}
