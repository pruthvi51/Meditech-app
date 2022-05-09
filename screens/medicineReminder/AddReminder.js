import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import DayPicker from "../../components/ui/DayPicker";
import ImagePicker from "../../components/ui/ImagePicker";
import TimePicker from "../../components/ui/TimePicker";
import { Colors } from "../../constants/styles";
import * as Notifications from "expo-notifications";

import Reminder from "../../models/Reminder";
import * as reminderActions from "../../store/actions/reminder";

const AddReminder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentInput, setCurrentInput] = useState({
    name: "",
    imageUri: "",
    day: "",
    hours: "",
    min: "",
  });

  async function scheduleNotificationHandler({ name, day, hours, min }) {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = days.indexOf(day) + 1;
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Notification",
        body: `Time to take ${name}`,
        data: { name },
      },
      trigger: {
        weekday: weekday,
        hour: Number(hours),
        minute: Number(min),
        repeats: true,
      },
    });
    return id;
  }

  const submitHandler = async () => {
    if (
      currentInput.name === "" ||
      currentInput.imageUri === "" ||
      !currentInput.hours ||
      !currentInput.min
    ) {
      Alert.alert(
        "Insufficient Info",
        "Some details are missing, please enter everything to add reminder"
      );
    } else {
      const notifId = await scheduleNotificationHandler({ ...currentInput });
      dispatch(
        reminderActions.addReminder(
          new Reminder(
            currentInput.name,
            currentInput.imageUri,
            currentInput.day,
            currentInput.hours,
            currentInput.min,
            notifId
          )
        )
      );

      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={{ color: Colors.primary800 }}>Medicine Name:</Text>
        <TextInput
          value={currentInput.name}
          onChangeText={(val) =>
            setCurrentInput({ ...currentInput, name: val })
          }
          style={{
            width: 150,
            padding: 3,
            borderWidth: 2,
            marginLeft: 20,
            borderColor: Colors.primary500,
          }}
        />
      </View>
      <Text style={{ color: Colors.primary800 }}>Add Image of medicine</Text>
      <ImagePicker
        onImageSubmit={(val) =>
          setCurrentInput({ ...currentInput, imageUri: val })
        }
      />
      <View style={{ height: 10 }}></View>
      <DayPicker
        setDay={(val) => setCurrentInput({ ...currentInput, day: val })}
      />
      <View style={{ height: 10 }}></View>
      <TimePicker
        setCTime={(val) =>
          setCurrentInput({ ...currentInput, hours: val.hours, min: val.min })
        }
      />
      <View style={{ height: 20 }}></View>
      <Button
        onPress={submitHandler}
        color={Colors.primary800}
        title="Submit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default AddReminder;
