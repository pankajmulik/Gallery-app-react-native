import React, {useEffect, useState} from 'react';

import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';

function App() {
  // use state used foe setting a data to vzriable images

  const [images, setImages] = useState(null);
  const [page, setpage] = useState(1);
  const image_sie = 380;

  //  in header set api key from pexel

  const headers = {
    Authorization: 'AZLdYdoDfMI9nfWlfkw534Q24Jibarld0o4kAbrYrmQyLAy1xZLcsfJA',
  };
  const fetchimagesfrompexel = async () => {
    const data = await fetch(
      'https://api.pexels.com/v1/search?query=nature&per_page=10',
      {headers},
    );

    const results = await data.json();
    return results;
  };

  useEffect(() => {
    const fetchimages = async () => {
      const images = await fetchimagesfrompexel();

      setImages(images.photos);
    };

    fetchimages();
  }, []);

  if (!images) {
    return <Text>Loading....</Text>;
  }

  return (
    <View>
      <TextInput placeholder="search images"></TextInput>
      <FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        pagingEnabled
        renderItem={({item}) => {
          return (
            <View style={{width: image_sie, height: image_sie}}>
              <Image
                source={{uri: item.src.portrait}}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

export default App;
