import React from 'react';
import FaceD from './screens/faceDetection'
// import Quiz from './screens/quiz'
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './screens/navigation/navigation'

export default class App extends React.Component {
constructor(){
  super();
  state={
    face:''

  }
}

// FaceDete(valu){
//   this.setState({face:valu})

// }
render(){
// console.log('face',this.state.face);

  return (
    <View style={{flex:1}}>

    
      {/* <FaceD
 
      /> */}
      <Navigator/>

      {/* <Quiz/> */}
    </View>
    
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
