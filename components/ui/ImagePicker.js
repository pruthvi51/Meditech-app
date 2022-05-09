import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/styles";

function ImagePicker({ onImageSubmit }) {
  const [pickedImage, setPickedImage] = useState();

  async function clickHandler() {
    const photo = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(photo.uri);
    onImageSubmit(photo.uri);
  }
  let imagePreview = <Text>No image Taken yet</Text>;
  if (pickedImage) {
    imagePreview = (
      <Image
        source={{ uri: pickedImage }}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    );
  }
  return (
    <View>
      <View style={style.imagePreview}>{imagePreview}</View>
      <Button onPress={clickHandler} title="Take picture" />
    </View>
  );
}

const style = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 150,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});

export default ImagePicker;
