import React from 'react';
import {FlatList, StyleSheet, Text, View, LogBox} from 'react-native';

import {RectButton, ScrollView} from 'react-native-gesture-handler';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import ScrollToExample from './ScrollToExample';
/* font awesome does not work * /
import AnimatedTabBarExample from './AnimatedTabBarExample';
/**/
import LightboxExample from './WebSpecific/LightBoxExample';
import Player from './Player';
import splashScreen from './splashScreen';
/* masked view does not work * /
import LiquidSwipe from './LiquidSwipe';
/**/
LogBox.ignoreLogs(['Calling `getNode()`']);
type Screens = Record<string, {screen: React.ComponentType; title?: string}>;
const SCREENS: Screens = {
  ScrollableToExample: {
    screen: ScrollToExample,
    title: '🆕 scrollTo',
  },

  LightboxExample: {
    screen: LightboxExample,
    title: '🆕 (advanced) Lightbox',
  },

  /** /
  AnimatedTabBarExample: {
    screen: AnimatedTabBarExample,
    title: '🆕 (advanced) Tab Bar Example',
  },
  /** /
  LiquidSwipe: {
    screen: LiquidSwipe,
    title: '🆕 Liquid Swipe Example',
  },
  /**/
};
type RootStackParams = {Home: undefined} & {[key: string]: undefined};
type MainScreenProps = {
  navigation: StackNavigationProp<RootStackParams, 'Home'>;
};

function MainScreen({navigation}: MainScreenProps) {
  const data = Object.keys(SCREENS).map((key) => ({key}));
  return (
    <FlatList
      style={styles.list}
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <MainScreenItem
          {...props}
          screens={SCREENS}
          onPressItem={({key}) => navigation.navigate(key)}
        />
      )}
      renderScrollComponent={(props) => <ScrollView {...props} />}
    />
  );
}

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
    <RectButton style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </RectButton>
  );
}

const Stack = createStackNavigator();

function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Home"
          options={{title: '🎬 Reanimated 2.x Examples'}}
          component={MainScreen}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
export default App;
