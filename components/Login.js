import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_URLS from "../config";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [username, setUsername] = useState("mario@rossi.it");
  const [password, setPassword] = useState("12345678");
  const { token, setAuthToken } = useContext(AuthContext);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Value stored successfully!");
    } catch (e) {
      console.error("Error storing value:", e);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Insert email and password");
      return;
    }

    const data = {
      email: username,
      password,
    };

    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        email: username,
        password,
      },
    };

    const response = await axios.post(`${API_URLS.reminderApi}/api/login/`, {
      email: username,
      password: password,
    });

    if (response.status === 200) {
      const data = response.data;
      if (data.token === undefined) {
        Alert.alert("Invalid login data");
        storeData("userToken", "");
        setAuthToken("");
      } else {
        storeData("userToken", data.token);
        setAuthToken(data.token);
        Alert.alert("Success", "User authenticated");
        setUsername("");
        setPassword("");
      }
    } else {
      const errorData = response.data;
      Alert.alert("Login error", errorData.message || "Login error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.paragraph}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.demoData}>
          <Text style={styles.demoDataP}>Demo data:</Text>
          <Text style={styles.demoDataP2}>username: mariorossi</Text>
          <Text style={styles.demoDataP2}>password: 12345678</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 150,
  },
  loginBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "80%",
    height: 290,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  paragraph: {
    padding: 12,
    paddingTop: 0,
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  loginButton: {
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#444",
    color: "#ffffff",
    borderRadius: 2,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  demoData: {
    marginTop: 5,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 2,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  demoDataP: {
    marginTop: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  demoDataP2: {
    marginTop: 1,
    textAlign: "center",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default Login;
