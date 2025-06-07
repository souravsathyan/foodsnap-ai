import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
const ImagePicker = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const isPermissionGranted =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!isPermissionGranted.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!response.canceled && response.assets[0].uri) {
      setImage(response.assets[0].uri);
      onImageSelected(response.assets[0].uri);
    }
  };

  const captureImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Please allow access to your camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      <Button title="Capture Image" onPress={captureImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
