import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { Alert } from "react-native";

// Define food labels (replace with your model's actual labels)
const foodLabels = ["pizza", "burger", "salad", "apple", "banana"]; // Adjust based on your model

// Load the TensorFlow.js model
export const loadModel = async () => {
  try {
    await tf.ready(); // Initialize TensorFlow.js
    const modelJson = require("../../assets/model/model.json");
    const modelWeights = [
      require("../../assets/model/group1-shard1of2.bin"),
      require("../../assets/model/group1-shard2of2.bin"),
    ];
    const model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights)
    );
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
    Alert.alert("Error", "Failed to load the model.");
    return null;
  }
};

// Preprocess the image for the model
export const preprocessImage = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const img = await tf.browser.fromPixels(blob);
    const resized = tf.image.resizeNearestNeighbor(img, [224, 224]); // MobileNet expects 224x224
    const normalized = resized.div(255.0);
    const batched = normalized.expandDims(0); // Add batch dimension
    return batched;
  } catch (error) {
    console.error("Error preprocessing image:", error);
    Alert.alert("Error", "Failed to process the image.");
    return null;
  }
};

// Make a prediction with the model
export const predictFood = async (model, uri) => {
  try {
    const imageTensor = await preprocessImage(uri);
    if (!imageTensor) return "Unknown food";
    const predictions = await model.predict(imageTensor);
    const predictedClass = predictions.argMax(-1).dataSync()[0];
    console.log({ predictedClass });
    const predictedFood = foodLabels[predictedClass] || "Unknown food";
    return predictedFood;
  } catch (error) {
    console.error("Prediction error:", error);
    Alert.alert("Error", "Failed to predict food.");
    return "Unknown food";
  }
};
