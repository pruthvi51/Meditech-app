import React from "react";
import { Select } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const DayPicker = ({ setDay }) => {
  let [service, setService] = React.useState("Every day");
  return (
    // <Select
    //   selectedValue={service}
    //   minWidth="200"
    //   accessibilityLabel="Choose Service"
    //   placeholder="Select Day"
    //   _selectedItem={{
    //     bg: "teal.600",
    //     endIcon: <FontAwesome5 name="chevron-down" size="5" />,
    //   }}
    //   mt={1}
    //   onValueChange={(itemValue) => {
    //     setService(itemValue);
    //     setDay(itemValue);
    //   }}
    // >
    //   <Select.Item label="Every day" value="Every day" />
    //   <Select.Item label="Monday" value="Monday" />
    //   <Select.Item label="Tuesday" value="Tuesday" />
    //   <Select.Item label="Wednesday" value="Wednesday" />
    //   <Select.Item label="Thursday" value="Thursday" />
    //   <Select.Item label="Friday" value="Friday" />
    //   <Select.Item label="Saturday" value="Saturday" />
    //   <Select.Item label="Sunday" value="Sunday" />
    // </Select>
    <Picker
      selectedValue={service}
      onValueChange={(itemValue, itemIndex) => {
        setService(itemValue);
        setDay(itemValue);
      }}
    >
      <Picker.Item label="Every day" value="Every day" />
      <Picker.Item label="Sunday" value="Sunday" />
      <Picker.Item label="Monday" value="Monday" />
      <Picker.Item label="Tuesday" value="Tuesday" />
      <Picker.Item label="Wednesday" value="Wednesday" />
      <Picker.Item label="Thursday" value="Thursday" />
      <Picker.Item label="Friday" value="Friday" />
      <Picker.Item label="Saturday" value="Saturday" />
    </Picker>
  );
};

export default DayPicker;
