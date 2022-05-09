import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import { getDiseases } from "../../util/https";
import Result from "./Result";
import Selector from "./Selector";
import IconButton from "../../components/ui/IconButton";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const DiseasePredictScreen = () => {
  const navigation = useNavigation();
  // const [symptoms, setSymptoms] = useState([]);
  // const [disease, setDisease] = useState("");
  // const [show, setShow] = useState(false)

  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <View style={styles.container}>
        <Selector
          setSymptoms={(val) => {
            navigation.navigate("Result", { val });
          }}
        />
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function PredictStack() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="DiseasePrediction"
        component={DiseasePredictScreen}
        options={{
          title: "Disease Prediction",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="log-out"
              size={24}
              color={tintColor}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{ title: "Prediction Result" }}
      />
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
