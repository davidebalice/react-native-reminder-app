import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, StyleSheet, View } from "react-native";
import { AuthContext } from "../context/authContext";
import Login from "../components/Login";

const ProtectedContents = ({ children }) => {
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Value stored successfully!");
    } catch (e) {
      console.error("Error storing value:", e);
    }
  };

  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("Retrieved value:", value);
        return value;
      } else {
        console.log("No value found for the given key");
        return null;
      }
    } catch (e) {
      console.error("Error retrieving value:", e);
      return null;
    }
  };

  const { token } = useContext(AuthContext);

  return token !== "" ? (
    <>{children}</>
  ) : (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

export default ProtectedContents;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ff0000",
    marginBottom: 10,
  },
});
