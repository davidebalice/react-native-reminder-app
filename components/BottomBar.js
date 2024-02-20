import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Entypo";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from "../context/themeContext";

const BottomBar = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Icon name="home" size={20} style={{ color: theme.colors.text }} />
        <Text style={{ ...styles.text, color: theme.colors.text }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          navigation.navigate("Products");
        }}
      >
        <Icon3
          name="shopping-cart"
          size={20}
          style={{ color: theme.colors.text }}
        />
        <Text style={{ ...styles.text, color: theme.colors.text }}>
          Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Icon6
          name="login-variant"
          size={20}
          style={{ color: theme.colors.text }}
        />
        <Text style={{ ...styles.text, color: theme.colors.text }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          navigation.navigate("Theme");
        }}
      >
        <Icon2
          name="settings-sharp"
          size={20}
          style={{ color: theme.colors.text }}
        />
        <Text style={{ ...styles.text, color: theme.colors.text }}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
    elevation: 4,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  tabButton: {
    alignItems: "center",
  },
  text: {
    fontSize: 10,
  },
});

export default BottomBar;
