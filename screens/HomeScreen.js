import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [randomPokemon, setRandomPokemon] = useState(null);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const randomIndex = Math.floor(
        Math.random() * response.data.results.length
      );
      const randomPokemonUrl = response.data.results[randomIndex].url;
      const pokemonResponse = await axios.get(randomPokemonUrl);
      setRandomPokemon(pokemonResponse.data);
    } catch (error) {
      console.error("Error fetching random pokemon:", error);
    }
  };

  const handleAddToCollection = () => {
    if (randomPokemon) {
      navigation.navigate("Collection", { pokemon: randomPokemon });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {randomPokemon && (
        <>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: randomPokemon.sprites.front_default }}
          />
          <Text>{randomPokemon.name}</Text>
          <Button title="Add to Collection" onPress={handleAddToCollection} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
