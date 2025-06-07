import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { loadModel, predictFood } from "../services/tensorflowService";
import ImagePicker from "../components/ImagePicker";

export default function HomeScreen() {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);

  // Load the TensorFlow.js model
  useEffect(() => {
    async function initializeModel() {
      const loadedModel = await loadModel();
      setModel(loadedModel);
      setIsLoading(false);
    }
    initializeModel();
  }, []);

  // Handle image selection and process food prediction
  const handleImageSelected = async (uri) => {
    if (!model) {
      Alert.alert("Error", "Model not loaded.");
      return;
    }
    setIsLoading(true);
    try {
      const predictedFood = await predictFood(model, uri);
      setResult(`Predicted Food: ${predictedFood}`);
    } catch (error) {
      console.error("Processing error:", error);
      Alert.alert("Error", "Failed to process image.");
    } finally {
      setIsLoading(false);
    }
    stellation();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodSnap AI</Text>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <ImagePicker onImageSelected={handleImageSelected} />
          {result && <Text style={styles.result}>{result}</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});
