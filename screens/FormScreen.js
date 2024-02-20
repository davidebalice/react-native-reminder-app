import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Form from "../components/Form";

const FormScreen = () => {
  return (
    <View style={styles.container}>
      <Form />
    </View>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});
