import React, { useRef, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import Reminders from "../components/Reminders";
import ProtectedContents from "../middlewares/ProtectedContents";
import { AuthContext } from "../context/authContext";

const HomeScreen = () => {
  const { token, setAuthToken } = useContext(AuthContext);

  const logout = () => {
    setAuthToken("");
  };

  return (
    <ProtectedContents style={styles.container}>
      <Reminders />
    </ProtectedContents>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: "100%",
    backgroundColor: "#f1f1f1",
  },
});