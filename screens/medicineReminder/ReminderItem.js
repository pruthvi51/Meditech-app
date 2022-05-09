import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/styles";

const ReminderItem = ({ item, onPress }) => {
  // console.log(item);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container && pressed && styles.pressed]}
    >
      <View style={styles.container}>
        <Image source={{ uri: item.imageUri }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 20 }}>{item.name.toUpperCase()}</Text>
          <View style={{ height: 7 }}></View>
          <Text>
            Repeats
            {item.name === "Everyday" ? " everyday" : ` every ${item.day}`}
          </Text>
          <View style={{ height: 7 }}></View>
          <Text>
            At {item.hours}:{item.min}hrs
          </Text>
          <View style={{ height: 5 }}></View>
          <View style={{ backgroundColor: "red", width: 60, borderRadius: 5 }}>
            <Text style={{ color: "white", textAlign: "center" }}>DELETE</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 30,
    backgroundColor: Colors.primary100,
    marginTop: 20,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    height: 150,
    width: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    justifyContent: "space-between",
    flex: 1,
    padding: 15,
  },
});

export default ReminderItem;
