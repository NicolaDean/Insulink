import React from 'react';
import { Text, View,FlatList, StyleSheet } from 'react-native';

import { useState,useEffect } from 'react';

export const FetchComponent = () =>{
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
     const response = await fetch('https://reactnative.dev/movies.json');
     const json = await response.json();
     setData(json.movies);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
  }
   useEffect(() => {
    getMovies();
  }, []);
  

    return (
       <View>
           <Text>Custom fetchComponent</Text>
           <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
       </View> 
    );
    
}

export default FetchComponent;