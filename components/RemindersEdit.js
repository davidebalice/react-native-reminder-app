import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
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
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";
import "moment/locale/it";
import { Picker } from "@react-native-picker/picker";

const RemindersEdit = ({ itemId }) => {
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState(null);
  const [category, setCategory] = useState({ label: null, value: null });
  const [display, setDisplay] = useState("none");
  const { token, setAuthToken, reload, setReload } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    deadline: "",
  });

  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `${API_URLS.reminderApi}/api/reminder/${itemId}`,
        axiosConfig
      );
      setFormData({
        ...response.data.reminder[0],  category_id: response.data.reminder[0].category_id._id,
      });
      /*
      const updatedFormData = {
        ...formData,
        category_id: response.data.reminder[0].category_id._id,
      };
      setFormData(updatedFormData);
      */
      const convertedData = response.data.categories.map((category) => ({
        label: category.name,
        value: category._id,
      }));
      setCategoriesData(convertedData);
      setCategory({
        value: response.data.reminder[0].category_id._id,
        label: response.data.reminder[0].category_id.name,
      });
    } catch (error) {
      console.error("Errore durante il recupero degli elementi:", error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    if (formData.deadline) {
      const dataMoment = moment(formData.deadline);
      moment.locale("it");
      const dataItaliana = dataMoment.format("DD/MM/YYYY");
      setSelectedDate(dataItaliana);
    }
  }, [formData.deadline]);

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

  const editReminder = () => {
    axios
      .post(
        `${API_URLS.reminderApi}//api/update/reminder/${itemId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      fontSize: 13,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: "#ddd",
      color: "#444444",
      marginBottom: 10,
    },
  });

  const handleValueChange = (value, index) => {
    const selectedCategoryData = categoriesData[index];
    const updatedFormData = { ...formData, category_id: value };
    setFormData(updatedFormData);
    setCategory({
      value: selectedCategoryData.value,
      label: selectedCategoryData.label,
    });
  };

  const changeScreen = (screen) => {
    setReload(reload + 1);
    navigation.navigate(screen);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => changeScreen("Home")}
        style={styles.dateButton}
      >
        <Icon
          name="calendar-o"
          size={15}
          color="#333"
          style={styles.dateIcon}
        />
        <Text style={styles.dateButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={[styles.bg, { display: display }]}>
        <Text> </Text>
      </View>
      <View style={styles.panel}>
        <Text style={{ fontWeight: "bold" }}>Edit reminder</Text>
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

        <TouchableOpacity style={styles.editButton} onPress={editReminder}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <Spacer height={10} />
      </View>
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
  plusIcon: {
    color: "#fff",
    fontSize: 28,
  },
  panel: {
    top: 6,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
  editButton: {
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

export default RemindersEdit;
