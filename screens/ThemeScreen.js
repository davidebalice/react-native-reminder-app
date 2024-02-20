import React, { useRef, useState, useContext } from "react";
import { StyleSheet } from "react-native";
import Spacer from "../components/Spacer";
import ThemeContext from "../context/themeContext";
import {
  lightTheme,
  darkTheme,
  bluTheme,
  redTheme,
  greenTheme,
  orangeTheme,
} from "../context/themes";
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

const ThemeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ScrollView>
      <Text style={styles.title}>Set App theming </Text>
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={[styles.column2, { backgroundColor: "#fff" }]}>
            <View style={[styles.text]}>
              <Text style={{ color: "#333" }}>Light</Text>
            </View>
            <Button
              title="Set"
              color="#665"
              style={styles.button}
              onPress={() => toggleTheme(lightTheme)}
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.column2, { backgroundColor: "#111" }]}>
            <View style={[styles.text]}>
              <Text style={{ color: "#fff" }}>Dark</Text>
            </View>
            <Button
              title="Set"
              color="#665"
              style={styles.button}
              onPress={() => toggleTheme(darkTheme)}
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.column2, { backgroundColor: "#2196F3" }]}>
            <View style={[styles.text]}>
              <Text style={{ color: "#fff" }}>Blue</Text>
            </View>
            <Button
              title="Set"
              color="#665"
              style={styles.button}
              onPress={() => toggleTheme(bluTheme)}
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.column2, { backgroundColor: "#ff0000" }]}>
            <View style={[styles.text]}>
              <Text style={{ color: "#fff" }}>Red</Text>
            </View>
            <Button
              title="Set"
              color="#665"
              style={styles.button}
              onPress={() => toggleTheme(redTheme)}
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.column2, { backgroundColor: "#0dbe15" }]}>
            <View style={[styles.text]}>
              <Text style={{ color: "#fff" }}>Green</Text>
            </View>
            <Button
              title="Set"
              color="#665"
              style={styles.button}
              onPress={() => toggleTheme(greenTheme)}
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.column2, { backgroundColor: "#ed720f" }]}>
            <View style={[styles.text]}>
              <Text style={{ color: "#fff" }}>Orange</Text>
            </View>
            <Button
              title="Set"
              color="#665"
              style={styles.button}
              onPress={() => toggleTheme(orangeTheme)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ThemeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 10,
    width: "100%",
    flexWrap: "wrap",
  },
  column: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    paddingTop: 40,
    margin: 0,
  },
  column2: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    height: 90,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    textAlign: "center",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  columnText: {
    fontSize: 16,
  },
  singleText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "justify",
  },
  columnText: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "justify",
  },
  spacer: {
    width: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#444444",
    color: "#333333",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
});
