import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DiseasePredictScreen from "../screens/diseasePrediction/DiseasePredictScreen";
import MedReminderScreen from "../screens/medicineReminder/MedReminderScreen";
import * as authActions from "../store/actions/auth";
import { Button, useNativeBase } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/styles";
import * as Notifications from "expo-notifications";

const Tab = createMaterialBottomTabNavigator();

function WelcomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [message, setMessage] = useState();
  const token = useSelector((state) => {
    return state.authState.token;
  });
  useEffect(() => {
    axios
      .get(
        "https://react-native-36782-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=" +
          token
      )
      .then((res) => {
        setMessage(res.data);
      })
      .catch((e) => console.log(e));
    const sub = Notifications.addNotificationReceivedListener(
      (notification) => {
        const name = notification.request.content.data.name;
        navigation.navigate("ImageNotification", { name });
      }
    );
    return () => {
      sub.remove();
    };
  });
  // console.log(token);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Button onPress={() => dispatch(authActions.logout())}>Log out</Button>
    </View>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
        headerShown: false,
      }}
    >
      {/* <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
      <Tab.Screen
        name="MedReminder"
        component={MedReminderScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm-outline" size={25} color={color} />
          ),
          tabBarActiveTintColor: Colors.primary500,
        }}
      />
      <Tab.Screen
        name="DiseasePredict"
        component={DiseasePredictScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="disease" size={25} color={color} />
          ),
          tabBarActiveTintColor: Colors.primary500,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
