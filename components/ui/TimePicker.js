import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, Platform, View } from "react-native";
import { Colors } from "../../constants/styles";

function TimePicker({ setCTime }) {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selected) => {
    const currDate = selected;
    setShow(Platform.OS === "ios");
    setTime(currDate);
    let tDate = new Date(currDate.getTime());
    // console.log(selected, tDate);
    setCTime({ hours: tDate.getHours(), min: tDate.getMinutes() });
  };
  const showMode = () => {
    setShow(true);
  };
  return (
    <View>
      <Button title="select Time" onPress={() => showMode()} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour
          display="default"
          onChange={onChange}
          //   timeZoneOffsetInMinutes={330}
        />
      )}
    </View>
  );
}
export default TimePicker;
