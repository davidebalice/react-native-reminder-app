import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import logo from "../assets/img/logoWhite.png";

export default InfoHome = () => {
  const openLink = () => {
    const url = "https://www.davidebalice.dev";
    Linking.openURL(url).catch((err) => console.error("Error:", err));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/img/bgInfo.jpg")}
        style={styles.section}
      >
        <Image style={styles.logo} source={logo} />
        <TouchableOpacity onPress={openLink}>
          <Text style={styles.label}>www.davidebalice.dev</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  section: {
    height: 250,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 170,
    height: 50,
  },

  label: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 10,
  },
  seeAllButton: {
    backgroundColor: "#A9A9A9",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  seeAllButtonText: {
    color: "#eee",
  },
});
