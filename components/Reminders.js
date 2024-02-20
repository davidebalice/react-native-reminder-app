import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  Button,
  ScrollView,
  Alert,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Spacer from "./Spacer";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import API_URLS from "../config";
import { format } from "date-fns";
import { configureDates, DatePickerModal } from "react-native-paper-dates";

const Reminders = () => {
  const panelHeight = useRef(new Animated.Value(0)).current;
  const [reminder, setReminder] = useState("");
  const [reminders, setReminders] = useState([]);
  const { token, setAuthToken } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const onDateChange = (dateObject) => {
    const selectedDateValue = dateObject?.date;

    if (
      selectedDateValue instanceof Date &&
      !isNaN(selectedDateValue.getTime())
    ) {
      const formattedDate = format(selectedDateValue, "dd/MM/yyyy");
      setSelectedDate(formattedDate);
    }
    setModalVisible(false);
  };

  /*
  configureDates({
    locales: {
      en: {
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        dayNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
    },
  });
*/
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URLS.reminderApi}/api/reminders/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setReminders(response.data.reminders);
    } catch (error) {
      console.log("error:" + error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openPanel = () => {
    Animated.timing(panelHeight, {
      toValue: 400,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(panelHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const addReminder = () => {
    setReminders([...reminders]);
    setReminder("");
    closePanel();
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>
            <Text style={styles.deadline}>
              {format(new Date(item._doc.deadline), "dd/MM/yyyy")}
            </Text>
            <Text> - </Text>
            {item._doc.title}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardText}>{item._doc.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            if (panelHeight._value === 0) {
              openPanel();
            } else {
              closePanel();
            }
          }}
        >
          <Icon
            name="plus-circle"
            size={20}
            color="#888"
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.panel, { height: panelHeight }]}>
        <Text>Add reminder</Text>
        <TextInput
          style={styles.input}
          value={reminder}
          onChangeText={setReminder}
          placeholder="Add item"
        />

        <View>
          <Button title="Apri Modal" onPress={() => setModalVisible(true)} />
          {modalVisible && (
            <DatePickerModal
              visible={modalVisible}
              locale="en"
              mode="single"
              onDismiss={() => setModalVisible(false)}
              onChange={onDateChange}
            />
          )}
          <Text>{selectedDate}</Text>

          <TextInput
            style={styles.input}
            value={selectedDate ? selectedDate.toString() : ""}
            placeholder="Add deadline"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <Spacer height={10} />
      </Animated.View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <FlatList
            data={reminders}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
          <Spacer height={100} />
        </ScrollView>
      </View>
      <Spacer height={10} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  storyName: {
    fontSize: 12,
    fontWeight: "bold",
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  deadline: {
    color: "#ff0000",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 12,
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
    zIndex: 200,
  },
  plusIcon: {
    color: "#fff",
    fontSize: 28,
  },
  panel: {
    position: "absolute",
    bottom: 6,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "green",
    zIndex: 100,
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
});

export default Reminders;
