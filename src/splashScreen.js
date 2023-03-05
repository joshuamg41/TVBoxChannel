import React, {useRef, useEffect} from 'react';
import {Animated, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FadeInView = (props) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const goToScreen = () => {
    navigation.navigate('Homes');
  };

  useEffect(() => {
    setTimeout(() => {
      goToScreen();
    }, 2500);
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0], // 0 : 150, 0.5 : 75, 1 : 0
            }),
          },
        ], // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <FadeInView
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 400, height: 400}}
          source={require('./assets/1024.png')}
        />
      </FadeInView>
    </View>
  );
};
