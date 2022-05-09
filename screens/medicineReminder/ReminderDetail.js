import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "native-base";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useDispatch } from "react-redux";

import * as reminderActions from "../../store/actions/reminder";
import IconButton from "../../components/ui/IconButton";
import { Colors } from "../../constants/styles";

const ReminderDetail = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const item = route.params.item;
  const navigation = useNavigation();
  // console.log(item);
  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 2,
          padding: 40,
          borderColor: Colors.primary800,
          backgroundColor: Colors.primary100,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.name.toUpperCase()}</Text>
        <View style={{ height: 20 }}></View>
        <Image
          source={{ uri: item.imageUri }}
          style={{ height: 150, width: 180 }}
        />

        <View style={{ height: 10 }}></View>
        <Text style={{ textAlign: "center" }}>
          Repeats
          {item.name === "Everyday" ? " everyday" : ` every ${item.day}`}
        </Text>
        <View style={{ height: 10 }}></View>
        <Text style={{ textAlign: "center" }}>
          At {item.hours}:{item.min}hrs
        </Text>
        <View style={{ height: 10 }}></View>
        <Button
          onPress={() => {
            dispatch(reminderActions.deleteRemainder(item.id, item.name));
            navigation.goBack();
          }}
          title="Delete"
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ReminderDetail;
{
  /* <Button
          leftIcon={
            <IconButton
              icon="trash"
              size={20}
              onPress={() => {}}
              color="white"
            />
          }
          // colorScheme="dark"
          onPress={() => {
            dispatch(reminderActions.deleteRemainder(item.id, item.name));
            navigation.goBack();
          }}
        >
          Delete
        </Button> */
}
