import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

const AlbumList = ()=>{
  const [photoset, setPhotoset] = useState(null)
  useEffect(() => {
    const buscarPhotosets = async () => {
			try{				
				const {data} = await
				axios.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=e547976b2d716c828132e12e4ce704d0&user_id=188650742%40N07&format=json&nojsoncallback=1');
				console.log(data)
				setPhotoset(data.photosets.photoset)
			}catch(err){
				console.log(err)
			}
		}
    buscarPhotosets()
  }, [])
  
  if(!photoset){
    return ()=>{
      <Text>
        Loading...
      </Text>
    }  
  }

  return (
   <View style={{ flex: 1 }}>      
      <FlatList
        data={photoset}
        renderItem={
          ({item}) =>
          <AlbumDetail key={item.id} title={item.title._content}  albumId={item.id}  />
        }
      />
    </View>
  )
  
}
export default AlbumList;
