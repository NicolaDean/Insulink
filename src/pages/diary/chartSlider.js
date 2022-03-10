import React from 'react'
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod'
import Slick from 'react-native-slick';
import {ProgressChart} from "react-native-chart-kit";

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
  } from 'react-native';
   

   
        export const ChartSlider =({}) =>{
            var styles = StyleSheet.create({
                wrapper: {
                },
                slide1: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#9DD6EB',
                },
                slide2: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#97CAE5',
                },
                slide3: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#92BBD9',
                },
                text: {
                  color: '#fff',
                  fontSize: 30,
                  fontWeight: 'bold',
                }
              })
return(
<Slick style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
        <ProgressChart 
            data={graph}
            width={screenWidth}
            height={180}
            strokeWidth={10}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chartStyle}
          />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Slick>
      );
}
export default ChartSlider;