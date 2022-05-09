import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Image,
  StyleSheet,
  BackHandler,
  Button,
  Text,
} from "react-native";
import { useSelector } from "react-redux";

const ImageNotification = () => {
  const route = useRoute();
  const name = route.params.name;
  const { imageUri } = useSelector((state) =>
    state.reminders.find((item) => item.name === name)
  );
  return (
    <View style={styles.container}>
      <Text>Time to take {name}!</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Button
        title="OK"
        onPress={() => {
          BackHandler.exitApp();
        }}
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
  image: {
    height: 100,
    width: 100,
  },
});

export default ImageNotification;
