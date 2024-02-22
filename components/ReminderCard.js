import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Spacer from "./Spacer";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import API_URLS from "../config";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const ReminderCard = ({ item, reload, setReload }) => {
  const navigation = useNavigation();
  const { token, setAuthToken } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleDelete = async () => {
    try {
      await axios.post(
        `${API_URLS.reminderApi}/api/reminder/delete/${item._doc._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      hideModal();
      setReload(reload + 1);
    } catch (error) {
      console.error("Error delete:", error);
    }
  };

  const handleEdit = () => {
    navigation.navigate("Edit", { itemId: item._doc._id });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View>
          <Text style={styles.title}>
            <Text style={styles.deadline}>
              {format(new Date(item._doc.deadline), "dd/MM/yyyy")}
            </Text>
            <Text> - </Text>
            {item._doc.title}
          </Text>
          <Text style={styles.cardText}>{item._doc.description}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            name="edit"
            size={20}
            color="#ff0000"
            style={styles.editIcon}
            onPress={handleEdit}
          />
          <TouchableOpacity onPress={showModal}>
            <Icon
              name="trash"
              size={20}
              color="#ff0000"
              style={styles.delIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Confirm delete?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.modalButton1}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideModal}>
              <Text style={styles.modalButton2}>Abort</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    margin: 10,
    marginBottom: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  cardBody: {
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
  },
  iconContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  deadline: {
    color: "#ff0000",
  },
  cardText: {
    marginTop: 7,
    fontSize: 12,
    textAlign: "left",
  },

  plusIcon: {
    color: "#fff",
    fontSize: 28,
  },
  editIcon: {
    color: "#336699",
    fontSize: 22,
  },
  delIcon: {
    color: "#ff0000",
    fontSize: 23,
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 22,
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
  },
  modalButton1: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    padding: 8,
    color: "#fff",
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButton2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    padding: 8,
    paddingHorizontal: 20,
    color: "#fff",
    borderRadius: 6,
  },
});

export default ReminderCard;
