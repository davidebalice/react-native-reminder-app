import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import logo from "../assets/img/logoDark.png";

const openLink = () => {
  const url = "https://www.davidebalice.dev";
  Linking.openURL(url).catch((err) => console.error("Error:", err));
};

const InfoModal = ({ modalVisible, setModalVisible }) => {
  const styles = {
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      backgroundColor: "white",
      padding: 20,
      paddingTop: 4,
      borderRadius: 10,
      alignItems: "center",
      elevation: 5,
      width: "88%",
    },
    close: {
      position: "absolute",
      top: 6,
      right: 10,
    },
    title1: {
      marginTop: 10,
      fontSize: 21,
      fontWeight: "bold",
    },
    title2: {
      marginTop: 2,
      fontSize: 17,
      fontWeight: "bold",
    },
    text: {
      marginTop: 20,
      fontSize: 15,
      textAlign: "center",
    },
    logo: {
      width: 110,
      height: 70,
      marginTop: 20,
    },
    link: {
      marginTop: 20,
      color: "#336699",
    },
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.close}>
            <Icon
              name="close"
              size={30}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title1}>React Native</Text>
          <Text style={styles.title2}>Starter App 1.03</Text>
          <Text style={styles.text}>
            App with basic components such as appbar, drawer, theming, api
            products, login, carousel, gallery, geolocation and more, useful for starting
            a new project.
          </Text>

          <TouchableOpacity onPress={openLink}>
            <Text style={styles.link}>www.davidebalice.dev</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
