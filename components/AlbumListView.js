import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Album from './Album';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import LayoutProvider from './LayoutProvider';

export default class AlbumsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(this.props.albums),
    };
    this._layoutProvider = new LayoutProvider(this.state.dataProvider);
    this._renderRow = this._renderRow.bind(this);
    this.footer = this.footer.bind(this)
  }

  _renderRow = (type, data) => {
    const {album, artist, numberOfSongs, artwork, id} = data.item;

    return (
      <View style={styles.containerGrid}>
        <Album
          albumName={album}
          artist={artist}
          artwork={artwork}
          id={id}
          numberOfSongs={numberOfSongs}
          album={data.item}
          openAlbumPlaylist={this.props.openAlbumPlaylist}
        />
      </View>
    );
  };

  footer = () => {
    return (
      <View style={{padding: 35}}>

      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.albums.length > 0 ? (
          <View style={styles.listContainer}>
            <RecyclerListView
              rowRenderer={this._renderRow}
              dataProvider={this.state.dataProvider}
              layoutProvider={this._layoutProvider}
              renderFooter={this.footer}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  containerGrid: {
    flex: 1,
    paddingHorizontal: 10,
  },

  listContainer: {
    paddingVertical: 15,
    flex: 1,
  },

 
});
