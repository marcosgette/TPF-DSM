import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = ({albumId})=>{
  const [photos, setPhotos] = useState(null)
  useEffect(() => {
    const buscarPhotos = async () => {
			try{				
				const {data} = await
				axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e547976b2d716c828132e12e4ce704d0&photoset_id=${albumId}&user_id=188650742%40N07&format=json&nojsoncallback=1`);
				console.log(data)
				setPhotos(data.photoset.photo)
			}catch(err){
				console.log(err)
			}
		}
    buscarPhotos()
  }, [])

  if(!photos){
    return (
      <View style={{ flex: 1 }}>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
        <FlatList
          data={photos}
          renderItem={
            ({item}) =>
            <PhotoDetail key={item.title} title={item.title} imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} />
          }
        />
    </View>
  )  
}
export default PhotoList;
