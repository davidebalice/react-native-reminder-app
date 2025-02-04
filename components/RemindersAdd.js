import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
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
import { DatePickerModal } from "react-native-paper-dates";
import { Picker } from "@react-native-picker/picker";

const RemindersAdd = ({ setReminder, reload, setReload }) => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [category, setCategory] = useState({ label: null, value: null });
  const panelHeight = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState("none");
  const { token } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    deadline: "",
  });
  const [open, setOpen] = useState(false);

  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openPanel = () => {
    Animated.timing(panelHeight, {
      toValue: 500,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setOpen(true);
  };

  const closePanel = () => {
    Animated.timing(panelHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setOpen(false);
  };

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
    setDisplay("none");
    const updatedFormData = { ...formData, deadline: selectedDateValue };
    setFormData(updatedFormData);
  };

  const openDatePicker = () => {
    setModalVisible(true);
    setDisplay("block");
  };

  const addReminder = () => {
    axios
      .post(`${API_URLS.reminderApi}/api/add/reminder`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setReload(reload + 1);
        setFormData({
          title: "",
          description: "",
          category_id: "",
          deadline: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setReminder("");
    closePanel();
  };

  useEffect(() => {
    axios
      .get(`${API_URLS.reminderApi}/api/add/reminder`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        const convertedData = response.data.categories.map((category) => ({
          label: category.name,
          value: category._id,
        }));
        setCategoriesData(convertedData);

        if (convertedData.length > 0) {
          const updatedFormData = {
            ...formData,
            category_id: convertedData[0].value,
          };
          setFormData(updatedFormData);
          setCategory({
            value: convertedData[0].value,
            label: convertedData[0].name,
          });
        }
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, []);

  const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      fontSize: 13,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: "#ddd",
      color: "#444",
      marginBottom: 10,
      zIndex: 100000,
    },
  });

  const handleValueChange = (value, index) => {
    console.log(value);
    const selectedCategoryData = categoriesData[index];
    const updatedFormData = { ...formData, category_id: value };
    setFormData(updatedFormData);
    setCategory({
      value: selectedCategoryData.value,
      label: selectedCategoryData.label,
    });
  };

  return (
    <>
      <View style={[styles.bg, { display: display }]}>
        <Text> </Text>
      </View>
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
          {open ? (
            <Icon name="close" size={20} color="#888" style={styles.plusIcon} />
          ) : (
            <Icon name="plus" size={20} color="#888" style={styles.plusIcon} />
          )}
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.panel, { height: panelHeight }]}>
        <Text style={{ fontWeight: "bold" }}>Add reminder</Text>
        <Spacer height={20} />
        <View>
          <TouchableOpacity
            onPress={() => openDatePicker()}
            style={styles.dateButton}
          >
            <Icon
              name="calendar-o"
              size={15}
              color="#333"
              style={styles.dateIcon}
            />
            <Text style={styles.dateButtonText}>Select deadline date</Text>
          </TouchableOpacity>
          {modalVisible && (
            <DatePickerModal
              visible={modalVisible}
              locale="en"
              mode="single"
              onDismiss={() => setModalVisible(false)}
              onConfirm={onDateChange}
              onChange={onDateChange}
            />
          )}

          <TextInput
            style={styles.input}
            value={selectedDate ? selectedDate.toString() : ""}
            placeholder="Deadline"
          />
          <TextInput
            name="title"
            style={styles.input}
            placeholder="Title"
            value={formData.title}
            onChangeText={(text) => handleInput("title", text)}
          />
          <TextInput
            name="description"
            style={styles.input}
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => handleInput("description", text)}
          />
        </View>
       {/* <Text>{category.value}</Text>*/}
        {categoriesData && categoriesData.length > 0 && (
          <Picker
            selectedValue={category.value}
            onValueChange={(itemValue, itemIndex) =>
              handleValueChange(itemValue, itemIndex)
            }
            style={pickerSelectStyles}
          >
            {categoriesData &&
              categoriesData.map((category, index) => (
                <Picker.Item
                  key={index}
                  label={category.label}
                  value={category.value}
                />
              ))}
          </Picker>
        )}

        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          <Text style={styles.buttonText}>Add reminder</Text>
        </TouchableOpacity>
        <Spacer height={10} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: "#fff",
  },
  dateButton: {
    backgroundColor: "#f1f1f1",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: 200,
  },
  dateButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#555",
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
  bg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10000,
    backgroundColor: "#fff",
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
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 12,
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

export default RemindersAdd;
