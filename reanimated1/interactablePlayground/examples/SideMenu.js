import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Button,
  Dimensions,
  Alert,
} from 'react-native';
import Interactable from '../../Interactable';

const Screen = Dimensions.get('window');
const SideMenuWidth = 280;
const RemainingWidth = Screen.width - SideMenuWidth;

const SideMenuHook = ({children}) => {
  const [menuInstance, setMenuInstance] = useState(null);

  const onMenuPress = () => {
    menuInstance.setVelocity({x: 2000});
  };

  const onClosePress = () => {
    menuInstance.setVelocity({x: -2000});
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../assets/Tvbackground.jpg')}
      />
      <View>
        <View style={styles.logoContainer}>
          <Text style={{color: 'white'}}>El contenido no para!</Text>
          <Image
            style={styles.logo}
            source={require('../assets/Logoboxchannelssquare.png')}
          />
        </View>
      </View>
      <View style={styles.sideMenuContainer} pointerEvents="box-none">
        <Interactable.View
          ref={(ref) => setMenuInstance(ref)}
          horizontalOnly={true}
          snapPoints={[{x: 0}, {x: -SideMenuWidth}]}
          boundaries={{right: RemainingWidth / 2}}
          initialPosition={{x: -SideMenuWidth}}>
          <View style={styles.sideMenu}>
            <Text style={styles.sideMenuTitle}>Menu</Text>
            <Button title="Report" onPress={() => Alert.alert('')} />
            <Text></Text>
            {/* <Button
              title="Button 2"
              onPress={() => alert('Button 2 pressed')}
            />
            <Button
              title="Button 3"
              onPress={() => alert('Button 3 pressed')}
            /> */}
            <Button title="Cerrar" onPress={onClosePress} />
          </View>
        </Interactable.View>
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={onMenuPress}>
          <Image
            style={styles.menuIcon}
            source={require('../assets/icon-menu.png')}
          />
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>Side Menu Example</Text> */}
      </View>

      <TouchableOpacity style={styles.body} onPress={() => {}}>
        <Text style={styles.content}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideMenuHook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 80,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    height: '40%',
    width: '100%',
    zIndex: 0,
  },
  sideMenuContainer: {
    position: 'absolute',
    top: 0,
    left: -RemainingWidth,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1002,
  },
  sideMenu: {
    left: 0,
    width: Screen.width,
    paddingLeft: 10 + RemainingWidth,
    flex: 1,
    backgroundColor: '#333030',
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  sideMenuTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    zIndex: 1001,
  },
  body: {
    height: '80%',
    paddingBottom: 20,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    marginLeft: 30,
    color: 'white',
    fontSize: 20,
  },
  content: {
    fontSize: 18,
  },
});
