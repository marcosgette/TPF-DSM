import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

/*
class PhotoList extends Component {
  state = { photos: null };

  componentWillMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e547976b2d716c828132e12e4ce704d0&photoset_id=${this.props.albumId}&user_id=188650742%40N07&format=json&nojsoncallback=1`)
      .then(response => this.setState({ photos: response.data.photoset.photo }));
  }

  renderAlbums() {
    return this.state.photos.map(photo =>
      <PhotoDetail key={photo.title} title={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
    );
  }

  render() {
    console.log(this.state);


    if (!this.state.photos) { 
			return (
                <View style={{ flex: 1 }}>
					<Text>
                        Loading...
					</Text>
                </View>
				);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        </View>
    );
  }
}
*/

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
