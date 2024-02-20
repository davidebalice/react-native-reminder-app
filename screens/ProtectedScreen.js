import React, { useRef, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ProtectedContents from "../middlewares/ProtectedContents";
import { AuthContext } from "../context/authContext";
import avatar1 from "../assets/img/avatar1.jpg";
import img from "../assets/img/image.jpg";

const ProtectedScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 6,
    },
    logoutButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#444",
      color: "#ffffff",
      borderRadius: 6,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    buttonText: {
      color: "#ffffff",
    },
    title: {
      fontWeight: "bold",
      fontSize: 17,
      color: "#1d9a10",
      marginBottom: 5,
    },
    headerContainer: {
      alignItems: "center",
    },
    coverPhoto: {
      width: "100%",
      height: 200,
    },
    profileContainer: {
      alignItems: "center",
      marginTop: -50,
    },
    profilePhoto: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    nameText: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
    },
    bioContainer: {
      padding: 15,
    },
    bioText: {
      fontSize: 16,
    },
    statsContainer: {
      flexDirection: "row",
      marginTop: 20,
      marginBottom: 20,
    },
    statContainer: {
      alignItems: "center",
      flex: 1,
    },
    statCount: {
      fontSize: 20,
      fontWeight: "bold",
    },
    statLabel: {
      fontSize: 16,
      color: "#999",
    },
    button: {
      backgroundColor: "#0066cc",
      borderRadius: 5,
      padding: 10,
      marginHorizontal: 20,
    },
    buttonText: {
      fontSize: 15,
      color: "#fff",
      textAlign: "center",
    },
    topBar: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      justifyContent: "space-around",
    },
  });

  const { token, setAuthToken } = useContext(AuthContext);

  const logout = () => {
    setAuthToken("");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProtectedContents>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.title}>Login successfully</Text>
              <Text>This page is visibile only to user authenticated</Text>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 10,
              padding: 1,
            }}
          ></View>

          <View style={styles.headerContainer}>
            <Image style={styles.coverPhoto} source={img} />
            <View style={styles.profileContainer}>
              <Image style={styles.profilePhoto} source={avatar1} />
              <Text style={styles.nameText}>Mario Rossi</Text>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ullamcorper nisi.
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={null}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </ProtectedContents>
      </ScrollView>
    </View>
  );
};

export default ProtectedScreen;
