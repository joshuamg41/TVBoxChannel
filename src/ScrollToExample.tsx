import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  scrollTo,
  useDerivedValue,
  useAnimatedRef,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import SideMenu from '../reanimated1/interactablePlayground/examples/SideMenu';
import {useNavigation} from '@react-navigation/native';

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const indices = [0, 1, 2, 3];

const range = [0, 9999];

const dotSize = 40;

function ScrollToScreen(): React.ReactElement {
  const navigation = useNavigation();
  const progress = useSharedValue(0);
  const number = useDerivedValue(() => {
    const val = range[0] + Math.round(progress.value * (range[1] - range[0]));
    return val;
  });
  const changeProgress = (newValue: any) => {
    let result = newValue;
    if (result > 1.0) {
      result = 1.0;
    }
    if (result < 0.0) {
      result = 0.0;
    }
    progress.value = result;
  };

  const increment = () => {
    changeProgress(progress.value + Math.random() * 0.1);
  };

  const decrement = () => {
    changeProgress(progress.value - Math.random() * 0.1);
  };

  const setRandom = () => {
    changeProgress(Math.random());
  };
  const bufferConfig = {
    minBufferMs: 15000,
    maxBufferMs: 50000,
    bufferForPlaybackMs: 2500,
    bufferForPlaybackAfterRebufferMs: 5000,
  };
  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <SideMenu>
          {Platform.isTV ? (
            <View style={{flexDirection: 'row', height: '100%'}}>
              <TouchableOpacity
                style={{margin: 0}}
                onPress={() =>
                  navigation.navigate('Player', {
                    uri: 'https://app.viloud.tv/hls/channel/579761e910c7369410c8ff9fcef19e62.m3u8',
                    bufferConfig: bufferConfig,
                  })
                }>
                <Image
                  style={{width: 200, height: 200}}
                  source={require('./assets/LOGOBOXPLAYLIST.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 0}}
                onPress={() =>
                  navigation.navigate('Player', {
                    uri: 'https://app.viloud.tv/hls/channel/9da5583bf56afa146062f169b08946d2.m3u8',
                    bufferConfig: bufferConfig,
                  })
                }>
                <Image
                  style={{width: 200, height: 200}}
                  source={require('./assets/LOGOBOXMAG.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 0}}
                onPress={() =>
                  navigation.navigate('Player', {
                    uri: 'https://app.viloud.tv/hls/channel/514e62570fec9967f9938d51c236c350.m3u8',
                    bufferConfig: bufferConfig,
                  })
                }>
                <Image
                  style={{width: 200, height: 200}}
                  source={require('./assets/logoBOXarcade.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 0}}
                onPress={() =>
                  navigation.navigate('Player', {
                    uri: 'https://app.viloud.tv/hls/channel/4e9c57e57e16990e1f71209c5fd6dbd1.m3u8',
                    bufferConfig: bufferConfig,
                  })
                }>
                <Image
                  style={{width: 200, height: 200}}
                  source={require('./assets/LOGOBOXHOT.png')}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text>move dot</Text>
              <View>
                <ProgressBar progress={progress} />
              </View>
            </View>
          )}
          {/* <NumberDisplay number={number} /> */}
        </SideMenu>
      </View>
    </SafeAreaView>
  );
}

function getDigit(number: Animated.SharedValue<number>, i: number) {
  return useDerivedValue(() => {
    return Math.floor(number.value / 10 ** i) % 10;
  });
}

function NumberDisplay({number}: {number: Animated.SharedValue<number>}) {
  return (
    <View style={{height: 400, width: 200}}>
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {indices.map((i) => {
          return <Digit digit={getDigit(number, i)} key={i} />;
        })}
      </View>
    </View>
  );
}

function Digit({digit}: {digit: Animated.SharedValue<number>}) {
  const aref = useAnimatedRef<ScrollView>();

  useDerivedValue(() => {
    if (Platform.OS === 'web') {
      if (aref && aref.current) {
        aref.current.scrollTo({y: digit.value * 200});
      }
    } else {
      scrollTo(aref, 0, digit.value * 200, true);
    }
  });

  return (
    <View style={{height: 200, width: Platform.OS === 'web' ? 50 : undefined}}>
      <ScrollView ref={aref}>
        {digits.map((i) => {
          return (
            <View
              style={{
                height: 200,
                alignItems: 'center',
                flexDirection: 'row',
              }}
              key={i}>
              <Text style={{fontSize: 30}}>{i}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function ProgressBar({progress}: {progress: Animated.SharedValue<number>}) {
  const x = useSharedValue(0);
  const max = useSharedValue(0);

  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
    },
    onActive: (e, ctx) => {
      let newVal = ctx.x + e.translationX;
      newVal = Math.min(max.value, newVal);
      newVal = Math.max(0, newVal);
      x.value = newVal;
    },
    onEnd: (_) => {
      progress.value = x.value / max.value;
    },
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });

  const barStyle = useAnimatedStyle(() => {
    return {
      width: max.value,
    };
  });
  return (
    <View style={{height: 100, paddingRight: 80, paddingLeft: 40, width: 300}}>
      <View
        onLayout={(e) => {
          max.value = e.nativeEvent.layout.width;
        }}>
        <Animated.View
          style={[
            {
              backgroundColor: 'black',
              height: 2,
              marginRight: 20,
              transform: [
                {translateY: dotSize / 2 + 1},
                {translateX: dotSize / 2},
              ],
            },
            barStyle,
          ]}
        />
        <PanGestureHandler onGestureEvent={handler}>
          <Animated.View style={[styles.dot, stylez]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
    backgroundColor: 'black',
    width: dotSize,
    height: dotSize,
  },
});

export default ScrollToScreen;
