import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Animated,
} from "react-native";
import ProtectedContents from "../middlewares/ProtectedContents";
import { AuthContext } from "../context/authContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import ReminderEdit from "../components/RemindersEdit";
import API_URLS from "../config";

const ReminderEditScreen = ({ route }) => {
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      <ProtectedContents>
        <View>
          <ReminderEdit itemId={itemId && itemId} />
        </View>
      </ProtectedContents>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f8ff",
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#ccc",
    padding: 10,
    alignItems: "center",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    marginBottom: 100,
  },
  buttonText: {
    fontWeight: "bold",
  },
  list: {
    marginTop: 10,
    width: "100%",
  },
  plusIcon: {
    color: "#fff",
    fontSize: 28,
  },
  deleteIcon: {
    color: "#ff0000",
    fontSize: 28,
  },
  panel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  card: {
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
    marginVertical: 7,
    marginHorizontal: 0,
    backgroundColor: "white",
    flexBasis: "46%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderLeftWidth: 6,
    borderRightWidth: 1,
    borderLeftColor: "#0fa327",
    borderRightColor: "#dddddd",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ReminderEditScreen;
