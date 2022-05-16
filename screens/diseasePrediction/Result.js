//import liraries
import { useRoute } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import { getDiseases } from "../../util/https";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

// create a component
const Reuslt = () => {
  const route = useRoute();
  const { val } = route.params;
  const [dLoaded, setDLoaded] = useState(false);
  const [disease, setDisease] = useState();
  if (!dLoaded) {
    getDiseases(val).then((val) => {
      setDisease({ disease: val.prediction, desc: val.description });
      console.log(disease);
      setDLoaded(true);
    });
    return (
      <View>
        <LoadingOverlay />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "red",
          opacity: 0.7,
          borderRadius: 10,
          padding: 20,
          marginBottom: 100,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "white",
            textAlign: "center",
          }}
        >
          Disclaimer
        </Text>
        <Text style={{ color: "white" }}>
          The predictions are made by an Intelligent system, We strongly
          recomend consulting a Doctor
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.primary800,
          width: "90%",
          // padding: 5,
          height: 250,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontFamily: "satisfy",
          }}
        >
          {disease.disease}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            color: "white",
            opacity: 0.5,
          }}
        >
          {disease.desc}
        </Text>
      </View>
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
