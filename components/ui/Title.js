import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/styles";

const Title = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 70,
  },
  title: {
    fontFamily: "satisfy",
    fontSize: 50,
    color: Colors.primary500,
  },
});

export default Title;
