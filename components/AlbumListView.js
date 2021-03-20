import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Album from './Album';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import LayoutProvider from './LayoutProvider';

export default class AlbumsListView extends Component {
  constructor(props) {
    super(props);
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.props.albums),
    };
    this._layoutProvider = new LayoutProvider( dataProvider.cloneWithRows(this.props.albums));
    this._renderRow = this._renderRow.bind(this);
    this.footer = this.footer.bind(this)


  }

  
  componentDidUpdate(nextProps) {
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    const { albums } = this.props;
    if (nextProps.albums !== albums) {
    
      const data = convertListView(albums, 'ALBUMS');
      this.setState({dataProvider: dataProvider.cloneWithRows(data)})
      this._layoutProvider = new LayoutProvider(
        dataProvider.cloneWithRows(data),
      );
    }
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
