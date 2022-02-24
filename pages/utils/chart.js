import React from 'react';
import Svg,{ G,Circle} from 'react-native-svg';
import {View,Text,StyleSheet} from 'react-native'

//TO DELETE (LASCIATA SOLO PER GARANZIA)
export const DonutChart = ({    data,
                                legend = ["A","B","C"],
                                colors = ["#a70000","#2D31FA","#FFD32D"],
                                radius = 40,
                                width = 400,
                                height = 400,
                                strokeWidth = 10,
                            }) =>{


    if (data ==  undefined) 
         return (<Text>No Data Available</Text>);

    console.log(data);
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;

    let tot = 0;
    let percentages = [];
    let offsets = [];
    let rotation = [];

    //Calculate Total
    data.forEach(element => {
        tot = tot + element;
    });
    
    let i=1;
    rotation.push(0);

    //Calculate Offset and rotation of each cirle in the graph
    data.forEach(element =>{
        let p = element/tot;
        percentages.push(p);
        offsets.push(circumference -  circumference*p);
        rotation.push(rotation[i-1] + 360*p);
        i = i+1;
    });


    //console.log("Offset:\t" + offsets);
    //console.log("Rotation:\t" + rotation);
    
    return (
        <View style={styles.container} height={height} width={width}>
         <View style={styles.graphWrapper}>
            <Text>CHART</Text>
            <Svg height={height} width={width} viewBox="0 0 180 180">
             <G style={styles.container} rotation={-90} originX="90" originY="90" >
                <Circle 
                    cx="50%" 
                    cy="50%" 
                    r={radius} 
                    fill="transparent"
                    stroke={colors[0]}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeOpacity=".1"
                    originX = "90"
                    originY = "90"
                />
                <Circle 
                    cx="50%" 
                    cy="50%" 
                    r={radius} 
                    fill="transparent"
                    stroke={colors[0]}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offsets[0]}
                    rotation={rotation[0]}
                    originX = "90"
                    originY = "90"
                />
                <Circle 
                    cx="50%" 
                    cy="50%" 
                    r={radius} 
                    fill="transparent"
                    stroke={colors[1]}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offsets[1]}
                    rotation={rotation[1]}
                    originX = "90"
                    originY = "90"
                />
                <Circle 
                    cx="50%" 
                    cy="50%" 
                    r={radius} 
                    fill="transparent"
                    stroke={colors[2]}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offsets[2]}
                    rotation={rotation[2]}
                    originX = "90"
                    originY = "90"
                />
                </G >
                <Legend legend={legend}/>
            </Svg>
            
            </View>
        </View>
    );
}

const Legend = ({legend}) =>{

    return (
        <Svg>
            <G style={styles.graphWrapper}>
                <Circle radius="10" fill="pink" /><Text>{legend[0]}</Text>
                <Circle radius="10" fill="pink" /><Text>{legend[1]}</Text>
                <Circle radius="10" fill="pink" /><Text>{legend[2]}</Text>
            </G>
        </Svg>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    graphWrapper: {
      alignItems: "center",
      justifyContent: "center",
    },
  });