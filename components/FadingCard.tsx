import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native'
import { Card, Button } from 'react-native-paper';
import Animated, {
  Value, useCode, cond, eq, Clock, add, 
  interpolate, Extrapolate, startClock, 
  set, not, proc} 
from 'react-native-reanimated'
import {useClock, useValues} from 'react-native-redash'
import Cards from './Cards'

const duration = 1000;

const runAnimation = proc(
  (
  startAnimation: Animated.Value<number>, 
  clock:Animated.Clock, 
  from: Animated.Value<number>, 
  to: Animated.Value<number>,
  startTime: Animated.Value<number>,
  opacity:Animated.Node<number>
  ) => 
    cond(eq(startAnimation,1), [
    startClock(clock),
    set(from, opacity),
    set(to, not(to)),
    set(startTime, clock),
    set(startAnimation,0),
  ])  
);



const FadingCard = () => {
  const [show, setShow] = useState(true);
  const clock = useClock();
  const [startTime, from, to] = useValues(0,0,0);
  const startAnimation = new Value(1);
  const endTime = add(startTime, duration);
  
  const opacity = interpolate(clock, {
    inputRange: [startTime,endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () => runAnimation(startAnimation, clock, from, to, startTime, opacity),
  [clock, from, startAnimation, startTime, to])

  return(
    <SafeAreaView style={styles.container}>

    <Card style={{height:250, width:300}}>
      <Animated.View style={{ opacity }}>
        <Cards />
      </Animated.View>
      <Card.Actions>
        <Button
          onPress={()=> setShow((prev) => !prev)}
        >
        {show ? "Hide" : "Show"}
        </Button>
      </Card.Actions>
    </Card>

  </SafeAreaView>
  );
  
};

export default FadingCard;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    backgroundColor: "#fff",
  },
});