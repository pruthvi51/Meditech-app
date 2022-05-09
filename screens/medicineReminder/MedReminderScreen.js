import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReminderList from "./ReminderList";
import ReminderDetail from "./ReminderDetail";
import AddReminder from "./AddReminder";

import IconButton from "../../components/ui/IconButton";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const Stack = createNativeStackNavigator();

const MedReminderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View collapsable={false} style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          gestureEnabled: true,
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ReminderList"
          component={ReminderList}
          options={{
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => {
                  navigation.navigate("AddReminder");
                }}
              />
            ),
            headerTitle: "All Reminders",
            // headerStyle: { backgroundColor: Colors.primary500 },
          }}
        />
        <Stack.Screen
          name="ReminderDetail"
          component={ReminderDetail}
          options={{
            title: "Medicine details",
          }}
        />
        <Stack.Screen
          name="AddReminder"
          component={AddReminder}
          options={{
            title: "Add Reminder",
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MedReminderScreen;
