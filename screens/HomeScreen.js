import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, FlatList } from "react-native";
import axios from "axios";
import { moderateScale } from "react-native-size-matters";

const HomeScreen = ({ navigation }) => {
  const [randomPokemons, setRandomPokemons] = useState([]);

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

  const fetchRandomPokemons = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );
      const pokemons = await Promise.all(
        response.data.results.map(async (result) => {
          const pokemonResponse = await axios.get(result.url);
          return pokemonResponse.data;
        })
      );
      setRandomPokemons(pokemons);
    } catch (error) {
      console.error("Error fetching random pokemons:", error);
    }
  };

  const handleAddToCollection = (pokemon) => {
    navigation.navigate("Collection", { pokemon });
  };

const renderItem = ({ item }) => {
  return (
    <View style={{ alignItems: "center", marginBottom: moderateScale(20) }}>
      <Image
        style={{ width: moderateScale(200), height: moderateScale(200) }}
        source={{ uri: item.sprites.front_default }}
      />
      <Text>{item.name}</Text>
      <Button
        title="Add to Collection"
        onPress={() => handleAddToCollection(item)}
      />
    </View>
  );
};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={randomPokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;
