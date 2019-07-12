import React ,{ Component } from 'react'
import { View, Text, TouchableOpacity,Button,Animated } from 'react-native'
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
  } from 'react-native-simple-radio-button';


  // class FadeInView extends React.Component {
  //   state = {
  //     fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  //   }
  
  //   componentDidMount() {
  //     Animated.timing(                  // Animate over time
  //       this.state.fadeAnim,            // The animated value to drive
  //       {
  //         toValue: 1,                   // Animate to opacity: 1 (opaque)
  //         duration: 5000,              // Make it take a while
  //       }
  //     ).start();                        // Starts the animation
  //   }
  
  //   render() {
  //     let { fadeAnim } = this.state;
  
  //     return (
  //       <Animated.View                 // Special animatable View
  //         style={{
  //           ...this.props.style,
  //           opacity: fadeAnim,         // Bind opacity to animated value
  //         }}
  //       >
  //         {this.props.children}
  //       </Animated.View>
  //     );
  //   }
  // }
  

 class Quiz extends Component{
    constructor(){
        super();
        this.state={
            response:null,question:0,userAnswer:null,result:0,resultDekhao:false,
            time: {}, seconds: 1 ,
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        
    }
    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        Animated.timing(                  // Animate over time
          this.state.fadeAnim,            // The animated value to drive
          {
            toValue: 1,                   // Animate to opacity: 1 (opaque)
            duration: 10000,              // Make it take a while
          }
        ).start();          
      }
    
      startTimer() {
        if (this.timer == 0 && this.state.seconds > -1) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds + 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
       
      }
    
    
   async componentDidMount(){
       await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
        .then(res=>res.json())
        .then(response=>{
            this.setState({response})
            console.log('resp>>>>>');
            // this.startTimer()
            if (this.timer == 0 && this.state.seconds > 0) {
                this.timer = setInterval(this.countDown, 1000);
              }
        }).catch(e=>{
            console.log('error',e.message);
            
        })
    }
    onPress(i){
        this.setState({ userAnswer:i,error:null })
    }
  
    next(){
        let { userAnswer,question,result } = this.state;
        if(userAnswer != null){

          if(userAnswer < 3){
            this.setState({userAnswer:null,question:question+1})
            }else{
                this.setState({result:result+1,userAnswer:null,question:question+1})
            }
        }else{
            this.setState({
                error:'Please select atleast one option...'
            })
        }
    }
    result(){
        let { userAnswer,question,result } = this.state;
        if(userAnswer < 3){
            this.setState({userAnswer:null,resultDekhao:true})
            clearInterval(this.timer);
        }else{
            this.setState({result:result+1,userAnswer:null,resultDekhao:true})
            clearInterval(this.timer);
        }

    }

    startAgain(){
      setState({question:0,resultDekhao:false})
      this.props.navigation.navigate('Face')
    }

 
    
    render(){
        let { response,question,userAnswer,result,resultDekhao } = this.state;
        console.log('userAnswer>>',userAnswer);
        console.log('res',result);
        

        
        return(
            <View style={{flex:1,flexDirection:'column',}}>

            { !resultDekhao && <View  style={{padding:6,backgroundColor:'#cfd8dc',height:'100%'}}>
               <Text style={{textAlign:'center',fontSize:30}}>  {this.state.time.m} : {this.state.time.s}</Text>
<View  >{response && 
<View >
  {/* <FadeInView> */}


<Text animation style={{width:'95%',boxShadow:'1px 1px 2px 2px black',margin:6,padding:6,fontSize:15,color:'red'}} shadowColor={'green'}> 

 Question No. {question+1} 

</Text>
<Text style={{margin:7,fontSize:19}}>
{ response.results[question].question}
</Text>

{response.results[question].incorrect_answers.length > 0 && (
  <RadioForm animation >
      {response.results[question].incorrect_answers.map((obj, i) => (
        <TouchableOpacity onPress={()=>this.onPress(i)} animation>

        <RadioButton labelHorizontal key={Math.random()}  style={ userAnswer === i ? {width:'95%',backgroundColor:'#296',color:'white',borderRadius:15,margin:6,padding:6}:{width:'95%',backgroundColor:'white',borderRadius:15,margin:6,padding:6}}>
          <RadioButtonInput
          
          obj={{label:obj}}
          index={question}
          isSelected={userAnswer === i}
          onPress={()=>this.onPress(i)}
          borderWidth={userAnswer === i ? 3 : 1}
            buttonInnerColor="#008"
            buttonOuterColor={userAnswer === i ? '#008' : '#000'}
            buttonSize={15}
            buttonOuterSize={25}
          />
          <RadioButtonLabel
         
         obj={{label:obj}}
         index={i}
         labelHorizontal
         onPress={()=>this.onPress(i)}
         labelStyle={userAnswer === i ?{ fontSize: 16, fontFamily: 'Century-Gothic',color:'white' }:{ fontSize: 16, fontFamily: 'Century-Gothic' }}
         labelWrapStyle={{}}
         />
        </RadioButton>
         </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={()=>this.onPress(3)} animation>

       <RadioButton labelHorizontal key={Math.random()}  style={ userAnswer === 3 ? {width:'95%',backgroundColor:'#296',color:'white',borderRadius:15,margin:6,padding:6}:{width:'95%',backgroundColor:'white',borderRadius:15,margin:6,padding:6}}>
          <RadioButtonInput
            obj={{label:response.results[question].correct_answer}}
            index={3}
            isSelected={userAnswer === 3}
            onPress={()=>this.onPress(3)}
            borderWidth={userAnswer === 3 ? 3 : 1}
            buttonInnerColor="#008"
            buttonOuterColor={userAnswer === 3 ? '#008' : '#000'}
            buttonSize={15}
            buttonOuterSize={25}
            />
          <RadioButtonLabel
                    obj={{label:response.results[question].correct_answer}}
                    index={i}
                    labelHorizontal
                    onPress={()=>this.onPress(3)}
                    labelStyle={userAnswer === 3 ?{ fontSize: 16, fontFamily: 'Century-Gothic',color:'white' }:{ fontSize: 16, fontFamily: 'Century-Gothic' }}
                    labelWrapStyle={{}}
                    />
        </RadioButton>
                    </TouchableOpacity>
        <Text style={{color:'red'}}>{this.state.error && this.state.error}</Text>
    </RadioForm>
  )}

         
{question < 9 && 
<TouchableOpacity onPress={() => this.next()} style={{display:'flex',alignContent:'flex-end',alignItems:'flex-end',marginRight:19,fontSize:'28px'}}>

<Text style={{backgroundColor:'brown',color:'white',width:'30%',textAlign:'center',borderRadius:35,fontSize:20,padding:3}}>Next </Text>
</TouchableOpacity>
}
{question == 9 && userAnswer != null &&
<TouchableOpacity onPress={() => this.result()} style={{display:'flex',alignContent:'flex-end',alignItems:'flex-end',marginRight:19,fontSize:'28px'}}>

<Text style={{backgroundColor:'#296',color:'white',width:'30%',textAlign:'center',borderRadius:15,fontSize:20,padding:3}}>Result </Text>
</TouchableOpacity>
  }

{/* </FadeInView> */}
</View>
}</View>
 </View>}
 {
   resultDekhao &&<View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <Text style={{fontSize:16}}>{ ' Time Taken = ' +this.state.time.m + ' minutes'}  : {this.state.time.s+ ' seconds'}</Text>
         <Text style={{fontSize:30}}>{'Result = '+   result*10+'%'}</Text>
         <Button
         onPress={()=>{ this.props.navigation.navigate('Face')}}
         title='Start Again'

         />
     </View>
 }
 </View>
        )
    }
}
export default Quiz;