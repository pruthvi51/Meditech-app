import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch, useSelector } from "react-redux";
import { combineReducers, createStore } from "redux";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";

import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IntroScreen from "./screens/Auth/IntroScreen";
import { Colors } from "./constants/styles";
import auth from "./store/reducers/auth";
import reminder from "./store/reducers/reminder";
import * as authActions from "./store/actions/auth";
import { NativeBaseProvider } from "native-base";

import { deleteAll, getReminders, init } from "./util/db";
import * as reminderActions from "./store/actions/reminder";
import * as Notifications from "expo-notifications";
import ImageNotification from "./screens/ImageNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

const store = createStore(
  combineReducers({
    authState: auth,
    reminders: reminder,
  })
);

const fetchFonts = () => {
  return loadAsync({
    satisfy: require("./assets/fonts/Satisfy-Regular.ttf"),
  });
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        // options={{
        //   headerRight: ({ tintColor }) => (
        //     <IconButton
        //       icon="exit"
        //       color={tintColor}
        //       size={24}
        //       onPress={() => dispatch(authActions.logout())}
        //     />
        //   ),
        // }}
      />
      <Stack.Screen name="ImageNotification" component={ImageNotification} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const dispatch = useDispatch();
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      if (res) {
        dispatch(authActions.authenticate(res));
      }
    });
    setIsTryingLogin(false);
    getReminders().then((res) => {
      dispatch(reminderActions.initRemainders(res));
    });
  }, []);
  const isAuthenticated = useSelector(
    (state) => state.authState.isAuthenticated
  );

  if (isTryingLogin) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [dbLoaded, setIsDbLoaded] = useState(false);
  useEffect(() => {
    init()
      .then(() => setIsDbLoaded(true))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  if (!dbLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Provider store={store}>
        <NativeBaseProvider>
          <StatusBar style="light" />
          <Navigation />
        </NativeBaseProvider>
      </Provider>
    </>
  );
}
