import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Spacer from "../components/Spacer";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/Feather";
import Icon5 from "react-native-vector-icons/Ionicons";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
import { screens } from "../screens/screens";
import img from "../assets/img/image.jpg";
import logo from "../assets/img/logoWhite.png";
import { AuthContext } from "../context/authContext";

const SideMenu = ({ navigation, closeDrawer }) => {
  const { logout, token } = useContext(AuthContext);
  const changeScreen = (screen) => {
    navigation.navigate(screen);
    closeDrawer();
  };

  return (
    <View style={[styles.container, styles.navigationContainer]}>
      <View>
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>Reminder App 1.02</Text>
        </View>
        <Image source={img} style={styles.image} />
      </View>
      <ScrollView>
        {screens.map((item) => (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => changeScreen(item.link)}
            key={item.id}
          >
            <View style={styles.iconContainer}>
              {item.typeIcon === "1" ? (
                <Icon name={item.icon} size={20} color="#111" />
              ) : item.typeIcon === "2" ? (
                <Icon2 name={item.icon} size={20} color="#111" />
              ) : item.typeIcon === "3" ? (
                <Icon3 name={item.icon} size={20} color="#111" />
              ) : item.typeIcon === "4" ? (
                <Icon4 name={item.icon} size={20} color="#111" />
              ) : item.typeIcon === "5" ? (
                <Icon5 name={item.icon} size={20} color="#111" />
              ) : (
                <Icon6 name={item.icon} size={20} color="#111" />
              )}
            </View>
            <Text style={{ marginLeft: 20 }}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {token && (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={logout}
            key="logoudMenu"
          >
            <Icon6 name="logout" size={20} />
            <Text style={{ marginLeft: 20 }}>Logout</Text>
          </TouchableOpacity>
        )}

        <Spacer height={200} />
      </ScrollView>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  paragraph: {
    padding: 14,
    fontSize: 15,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1.5,
    resizeMode: "cover",
  },
  iconContainer: {
    width: 23,
    textAlign: "center",
  },
  text: {
    marginLeft: 20,
    color: "#111",
  },
  titleContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  title: {
    fontWeight: "bold",
    padding: 14,
    color: "#fff",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  logoContainer: {
    textAlign: "right",
    display: "flex",
    width: "100%",
    padding: 14,
  },
  logo: {
    width: 100,
    height: 30,
    alignSelf: "flex-end",
  },
});
