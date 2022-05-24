import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image , ActivityIndicator , FlatList} from 'react-native';
import * as Location from 'expo-location';
import React , {useState, useEffect} from 'react';

export default function App() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescritpion] = useState(null);
  const [icon, setIcon] = useState(null);
  const [prevision, setPrevision] = useState(null);

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
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+location.coords.latitude+'&lon='+location.coords.longitude+'&appid=a3cca33b945358f4298ec5a580676d0f&units=metric&lang=fr ')
        .then(response => response.json())
        .then(data => {
          setTemperature(data.main.temp);
          setDescritpion(data.weather[0].description);
          setIcon(data.weather[0].icon);
          // alert(JSON.stringify(data))
        })
  }

  const getPrevi = () => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+location.coords.latitude+'&lon='+location.coords.longitude+'&exclude=hourly,minutely&appid=a3cca33b945358f4298ec5a580676d0f&units=metric&lang=fr ')
        .then(response => response.json())
        .then(data => {
          setPrevision(data);
          
          // console.log(data)
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

    location && getWeather();
    location && getPrevi();
  }, []);
 
  let text = 'Waiting..';
  let attente = '';
  if (errorMsg) {
    text = errorMsg;
    
  } else if (location) {
    text = location.coords.latitude;
    attente = "ok";
    // let result = alert(getMoviesFromApiAsync());
    

  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{"\n"}{"\n"}{"\n"}</Text>
      {attente != ''? <Text style={styles.load}></Text>: <ActivityIndicator style={styles.load} color={"#385164"} /> }
      {attente != ''? <Text style={styles.paragraph}>Température : {temperature} °C</Text>: null }
      
      {attente != ''? <Text style={styles.paragraph}> 
      <Image style={styles.icon}
          source={{uri: 'http://openweathermap.org/img/wn/'+icon+'.png'}}
        /></Text>: null }
      {attente != ''? <Text style={styles.paragraph}>{description}</Text>: null }
      {attente != ''? 
      prevision && 
      <FlatList
          data={prevision.daily}
          renderItem={({item}) => 
          <Text style={styles.item}>{"\n"} Température : {item.temp.max} °C{"\n"}
          <Image style={styles.icon}
              source={{uri: 'http://openweathermap.org/img/wn/'+item.weather[0].icon+'.png'}}
            />{"\n"}{item.weather[0].description}{"\n"}{"\n"}</Text>}
        />: null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
  load: {
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    alignItems: 'center',
  },
});
