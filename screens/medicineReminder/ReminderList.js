import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import ReminderItem from "./ReminderItem";

const list = [
  {
    id: 1,
    name: "maxocine",
  },
  {
    id: 2,
    name: "ramocil",
  },
  {
    id: 3,
    name: "jafincal",
  },
];

const ReminderList = () => {
  const navigation = useNavigation();
  //   return <Text>Reminder List</Text>;
  const data = useSelector((state) => state.reminders);
  // console.log(data);
  if (data.length === 0) {
    return <Text>There Are No Remainders</Text>;
  }
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ReminderItem
            item={item}
            onPress={() =>
              navigation.navigate("ReminderDetail", { item: item })
            }
          />
        )}
      />
    </View>
  );
};

export default ReminderList;
