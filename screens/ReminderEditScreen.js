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
import API_URLS from "../config";

const ReminderEditScreen = ({ route }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const panelHeight = useRef(new Animated.Value(0)).current;
  const { token, setAuthToken } = useContext(AuthContext);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchInitialItems = async () => {
    try {
      const response = await axios.get(
        `${API_URLS.reminderApi}/reminder`,
        axiosConfig
      );

      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Errore durante il recupero degli elementi:", error);
    }
  };

  useEffect(() => {
    fetchInitialItems();
  }, []);

  const addItem = async () => {
    try {
      const response = await axios.post(
        `${API_URLS.reminderApi}/reminder`,
        axiosConfig,
        { item }
      );
      setItems([...items, response.data]);
      setItem("");
      closePanel();
    } catch (error) {
      console.error("Errore durante l'aggiunta dell'elemento:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ProtectedContents>
        <View style={styles.floatingButtonContainer}>
          <Text>{itemId}</Text>
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
  floatingButtonContainer: {
    position: "absolute",
    bottom: 60,
    right: 20,
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    color: "#ffffff",
    backgroundColor: "#0fa327",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    zIndex: 10,
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