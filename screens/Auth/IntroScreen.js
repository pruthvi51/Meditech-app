import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { Colors } from "../../constants/styles";

const IntroScreen = () => {
  const navigation = useNavigation();
  const isFocussed = useIsFocused();
  if (isFocussed) {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "satisfy",
          fontSize: 30,
          color: Colors.primary800,
        }}
      >
        Welcome to Medical App!
      </Text>
      <View style={{ marginVertical: 40 }}>
        <Image
          style={{ height: 200, width: 200 }}
          source={require("../../assets/doctor_image.jpg")}
        />
      </View>
      <Button
        isLoading
        isLoadingText="Loading..."
        variant="unstyled"
        size="lg"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IntroScreen;
