import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

export default Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      title: "Item 1",
      content: "Lorem ispum dolor est",
      image: "https://www.aroundweb.it/react/starter-app/city1.jpg",
    },
    {
      title: "Item 2",
      content: "Lorem ispum dolor est",
      image: "https://www.aroundweb.it/react/starter-app/city2.jpg",
    },
    {
      title: "Item 3",
      content: "Lorem ispum dolor est",
      image: "https://www.aroundweb.it/react/starter-app/city3.jpg",
    },
  ];

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const x = event.nativeEvent.contentOffset.x;
          const index = Math.floor(x / (width - 60));
          if (index !== activeIndex) {
            setActiveIndex(index);
          }
        }}
        scrollEventThrottle={16}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {items.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
            <View
              style={[
                styles.dot,
                { backgroundColor: index === activeIndex ? "white" : "gray" },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 420,
    borderWith: 1,
    borderColor: "#333333",
  },
  itemContainer: {
    width: width - 60,
    height: height / 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainer: {
    width: "90%",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
    position: "absolute",
    bottom: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    textAlign: "center",
  },
  dotContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 5,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
  },
});
