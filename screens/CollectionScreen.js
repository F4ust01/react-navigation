import React, { useState } from "react";
import { View, Text, FlatList, Image, Button } from "react-native";

const CollectionScreen = ({ route }) => {
  const [collection, setCollection] = useState([]);

  const { pokemon } = route.params;

  const addToCollection = () => {
    setCollection((prevCollection) => [...prevCollection, pokemon]);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pokémon Collected</Text>
      <Button title="Add to Collection" onPress={addToCollection} />
      <FlatList
        data={collection}
        renderItem={({ item }) => (
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item.sprites.front_default }}
            />
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CollectionScreen;
