import { Dimensions, StyleSheet } from "react-native";


const {width} = Dimensions.get('screen');

export const color ={
 primary: '#4CC671',
 second: '#0594A4',
 third: '#173B48'
}
export const globalStyles = StyleSheet.create({
  searchStyle:{
    width: width,
    height: 100,
    justifyContent:"center",
    alignItems:"center",
    display:'flex',
    flexDirection:"row"
  },
  inputStyle:{
    backgroundColor:'#EDEDED', 
    width:'90%', 
    height:40, 
    borderRadius:10, 
    paddingLeft:10, 
    borderWidth:1, 
    borderColor:'#D1D1D1'
  },
  cardStyle:{
    height:100, 
    margin:2,
    display:'flex',
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth:0.5,
    borderColor:'#0594A4'
  },
  detailInfo:{ 
    backgroundColor: "#FAFAFA", 
    height: '50%', 
    borderTopRightRadius: 50, 
    borderTopLeftRadius: 50, 
    bottom: 45, 
    alignItems: 'center',
    borderWidth:1,
    borderColor: '#173B48'
  },
  cardContainer:{
    width:'95%',
    height:120,
    borderRadius:10,
    borderColor: '#0594A4',
    borderWidth:1,
    marginBottom:10,
    display:'flex',
    flexDirection:'row',
  }
})