//import liraries
import { useRoute } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getDiseases } from "../../util/https";

// create a component
const Reuslt = () => {
  const route = useRoute();
  const { val } = route.params;
  const [dLoaded, setDLoaded] = useState(false);
  const [disease, setDisease] = useState("");
  if (!dLoaded) {
    getDiseases(val).then((val) => {
      setDisease(val);
      setDLoaded(true);
    });
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{disease}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default Reuslt;
