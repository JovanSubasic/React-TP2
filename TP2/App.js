import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import * as Location from 'expo-location';
import React , {useState, useEffect} from 'react';

export default function App() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescritpion] = useState(null);
  const [icon, setIcon] = useState(null);

  // +'.location.latitude.'+

  // const getMoviesFromApiAsync = async () => {

  //   let key = "4f13375416924547311654d5dd4a1363";
  //   try {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${key}`
  //     );

  //     const json = await response.json();
  //     return json;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getWeather = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+location.coords.latitude+'&lon='+location.coords.longitude+'&appid=4f13375416924547311654d5dd4a1363&units=metric&lang=fr ')
        .then(response => response.json())
        .then(data => {
          setTemperature(data.main.temp);
          setDescritpion(data.weather[0].description);
          setIcon(data.weather[0].icon);
          // alert(JSON.stringify(data))
        })
  }
 
  useEffect(() => {

    


    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
 
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // getMoviesFromApiAsync();
      // let result = getMoviesFromApiAsync();
      // setApi(result);
    })();
  }, []);
 
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location.coords.latitude;
    // let result = alert(getMoviesFromApiAsync());
    text = getWeather();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>Température : {temperature} °C</Text>
      <Text style={styles.paragraph}>Déscription : {description}</Text>
      <Text style={styles.paragraph}>Icon : 
      <Image style={{width: 30, height: 30}}
          source={{uri: 'http://openweathermap.org/img/wn/'+icon+'.png'}}
        /></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
