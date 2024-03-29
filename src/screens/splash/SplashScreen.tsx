import { Image, StyleSheet, Text, View } from "react-native"



const SplashScreen = () =>{
  return(
    <View style={styles.continer}>
      <View style={styles.container1}>
        <Image
          source={require('../../assets/logoFurniPro.png')}
          style={{width:250, height:250}}
        />
      </View>
      <View style={{position:'absolute', bottom:5, left:15}}>
        <Text>
          Version 0.0.1
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  continer:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },
  container1:{
    position:'absolute',
    top:'30%',
    left:'20%'
  },
  img:{
    width:194,
    height:193
  }
})

export default SplashScreen;