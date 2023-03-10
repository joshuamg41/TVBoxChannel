import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
export default function Player({route, navigation}: any) {
  const [fullScreen, setFullScreen] = React.useState(false);
  return (
    <View style={[styles.container, fullScreen && styles.pd]}>
      {/* <Video
        source={{
          uri: 'https://app.viloud.tv/hls/channel/579761e910c7369410c8ff9fcef19e62.m3u8',
        }} // Can be a URL or a local file.
        // Store reference
        Focusable={false}
        bufferConfig={route?.params}
        onBuffer={() => console.log('buffer')} // Callback when remote video is buffering
        onError={() => console.log('Error')} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      /> */}
      <VideoPlayer
        source={{uri: route?.params?.uri}}
        navigator={navigation}
        disableVolume={true}
        disablePlayPause={true}
        onEnterFullscreen={() => setFullScreen(true)}
        onExitFullscreen={() => setFullScreen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pd: {
    padding: 40,
  },
  backgroundVideo: {
    backgroundColor: 'black',
    position: 'absolute',
    top: -100,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
