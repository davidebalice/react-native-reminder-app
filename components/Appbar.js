import React, { useContext, useState } from "react";
import { View, Image, TouchableOpacity, Button } from "react-native";
import InfoModal from "./InfoModal";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import ThemeContext from "../context/themeContext";

const Appbar = ({ onLeftPress, onRightPress, openDrawer }) => {
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const styles = {
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      paddingTop: 30,
      backgroundColor: theme.colors.background,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    titleContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 18,
      color: "white",
    },
    iconContainer: {
      padding: 10,
    },
  };

  return (
    <View style={styles.container}>
      <InfoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
        <Icon
          name="bars"
          size={30}
          color={theme.colors.text}
          onPress={openDrawer}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Image
          source={theme.logo}
          style={{ width: 110, height: 70 }}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.iconContainer}>
        <Icon2
          name="info-circle"
          size={34}
          color={theme.colors.text}
          onPress={() => setModalVisible(true)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Appbar;
