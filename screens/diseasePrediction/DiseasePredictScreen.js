import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import { getDiseases } from "../../util/https";
import Result from "./Result";
import Selector from "./Selector";

const DiseasePredictScreen = () => {
  const navigation = useNavigation();
  // const [symptoms, setSymptoms] = useState([]);
  // const [disease, setDisease] = useState("");
  // const [show, setShow] = useState(false)

  return (
    <View style={styles.container}>
      <Selector
        setSymptoms={(val) => {
          navigation.navigate("Result", { val });
        }}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function PredictStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
      }}
    >
      <Stack.Screen name="DiseasePrediction" component={DiseasePredictScreen} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
