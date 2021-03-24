import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../store/actions';
import TracksListView from '../components/TracksListView';

const SearchView = ({ navigation }) => {
  const dispatch = useDispatch()
  const {
    primary,

    subtext,
  } = useSelector((state) => state.themeReducer.theme);
  const { tracks } = useSelector((state) => state.globalReducer);
  const [search, setSearch] = useState('');
  const [filteredTracks, setFilteredtracks] = useState([]);
  useEffect(() => {
    return () => {};
  }, []);

  const matched = (track, searchQuery) => {
    const artistName =
      track.artist !== 'Unknown' ? track.artist.toLowerCase() : null;
    let trackName = track.title.toLowerCase();

    if (artistName) {
      trackName = trackName + artistName;
    }

    return trackName.includes(searchQuery);
  };

  const getSearchResults = (inputText) => {
    const searchQuery = inputText.toLowerCase();
    setSearch(inputText);

    const filtered = tracks.filter((track) => {
      return matched(track, searchQuery);
    });
    if (inputText) {
      setFilteredtracks(filtered);
    } else {
      setFilteredtracks([]);
    }
  };

  useEffect(() => {
    
    return () => {
      dispatch(AllActions.setAppLoaded(true))
    }
  },[])


  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Icon
              type="entypo"
              style={styles.backIcon}
              name="chevron-thin-left"
              size={25}
              color={subtext}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Search Tracks</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar
            inputContainerStyle={{ backgroundColor: '#eee', borderRadius: 50 }}
            containerStyle={{ backgroundColor: primary, borderRadius: 50 }}
            placeholder="Track/Artist Name..."
            onChangeText={getSearchResults}
            value={search}
          />
        </View>
      </View>
      <View style={styles.tracksContainer}>
        <TracksListView tracks={filteredTracks} />
      </View>
    </View>
  );
};

const radius = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,

    paddingHorizontal: 20,
  },

  backIcon: {
    paddingVertical: 10,
    paddingRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: 20,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBarContainer: {
    flex: 1,
  },
  tracksContainer: {
    flex: 1,
    backgroundColor: '#eee',
    borderTopRightRadius: radius,
    paddingTop: 10,
    overflow: 'hidden',
  },
});

export default SearchView;
