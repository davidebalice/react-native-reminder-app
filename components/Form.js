import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailSend = () => {
    const data = {
      firstName,
      email,
      phone,
      message,
    };

    fetch("send_email_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Email sended!");
          setFirstName("");
          setEmail("");
          setPhone("");
          setMessage("");
        } else {
          Alert.alert("Error");
        }
      })
      .catch((error) => {
        Alert.alert("Error:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Contact form</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={firstName}
        style={styles.input}
        onChangeText={(text) => setFirstName(text)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Tel</Text>
      <TextInput
        placeholder="Tel"
        value={phone}
        style={styles.input}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Message</Text>
      <TextInput
        placeholder="Message"
        value={message}
        style={styles.textArea}
        onChangeText={(text) => setMessage(text)}
        multiline
        numberOfLines={4}
      />
      <Button
        style={styles.sendButton}
        title="Send email"
        onPress={handleEmailSend}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 11,
    marginBottom: 5,
    width: "90%",
    color: "#333",
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#f1f1f1",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    width: "90%",
    backgroundColor: "#f1f1f1",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#444",
    textAlign: "center",
  },
  sendButton: {
    marginTop: 1,
    padding: 1,
  },
});
