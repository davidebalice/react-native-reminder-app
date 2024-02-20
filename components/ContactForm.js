import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Logica per l'invio dell'email
    if (email && name && phone && message) {
      // Qui puoi inserire la tua logica per inviare l'email, ad esempio chiamando una funzione o API
      const emailContent = `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone}\n\nMessaggio:\n${message}`;
      // Simulazione invio email con contenuto
      Alert.alert(
        "Email inviata!",
        `Hai inviato un'email con i seguenti dettagli:\n\n${emailContent}`
      );
      // Resetta i campi dopo l'invio
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
    } else {
      Alert.alert(
        "Campi mancanti",
        "Compila tutti i campi per inviare l'email."
      );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Nome"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Indirizzo email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={(text) => setPhone(text)}
        value={phone}
        placeholder="Telefono"
        keyboardType="phone-pad"
      />
      <TextInput
        style={{
          height: 100,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          textAlignVertical: "top",
        }}
        onChangeText={(text) => setMessage(text)}
        value={message}
        placeholder="Testo del messaggio"
        multiline
      />
      <Button title="Invia Email" onPress={handleSend} />
    </View>
  );
};

export default EmailForm;
