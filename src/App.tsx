import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TVEventControl,
  View,
  LogBox,
} from 'react-native';

import 'react-native/tvos-types.d';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ScrollToExample from './ScrollToExample';
import splashScreen from './splashScreen';
import Player from './Player';
LogBox.ignoreLogs(['Calling `getNode()`']);

type Screens = Record<
  string,
  {screen: React.ComponentType; title?: string; tv?: boolean}
>;

type RootStackParams = {Home: undefined} & {[key: string]: undefined};
type MainScreenProps = {
  navigation: StackNavigationProp<RootStackParams, 'Home'>;
  setUseRea2: (useRea2: boolean) => void;
};

export function ItemSeparator(): React.ReactElement {
  return <View style={styles.separator} />;
}

type Item = {key: string};
type MainScreenItemProps = {
  item: Item;
  onPressItem: ({key}: Item) => void;
  screens: Screens;
};
export function MainScreenItem({
  item,
  onPressItem,
  screens,
}: MainScreenItemProps): React.ReactElement {
  const {key} = item;
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </TouchableOpacity>
  );
}

const Stack = createStackNavigator();

const Reanimated2 = () => (
  <Stack.Navigator initialRouteName="Splash">
    {/* <Stack.Screen
      name="Home"
      options={{headerShown: false}}
      children={(props) => <MainScreen {...props} setUseRea2={setUseRea2} />}
    /> */}
    <Stack.Screen
      name="Homes"
      options={{headerShown: false}}
      component={ScrollToExample}
    />
    <Stack.Screen
      name="Player"
      options={{headerShown: false}}
      component={Player}
    />
    <Stack.Screen
      name="Splash"
      options={{headerShown: false}}
      component={splashScreen}
    />

    {/* {Object.keys(SCREENS).map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => SCREENS[name].screen}
        options={headerOptions(SCREENS[name].title || name)}
      />
    ))} */}
  </Stack.Navigator>
);

function App(): React.ReactElement {
  TVEventControl.enableTVMenuKey();
  return <NavigationContainer>{Reanimated2()}</NavigationContainer>;
}

const scale = Platform.isTV && Platform.OS === 'ios' ? 1.0 : 0.5;

// const headerOptions = (title: string) => {
//   return {
//     title,
//     headerTitleStyle: styles.headerTitle,
//     headerStyle: styles.header,
//   };
// };

export const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 30 * scale,
  },
  button: {
    flex: 1,
    height: 100 * scale,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 50 * scale,
  },
  header: {
    height: 200 * scale,
  },
});

export default App;
