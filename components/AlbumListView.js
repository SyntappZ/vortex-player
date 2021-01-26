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
  }

  _renderRow = (type, data) => {
    const {album, author, numberOfSongs, cover, id} = data.item;

    return (
      <View style={styles.containerGrid}>
        <Album
          album={album}
          author={author}
          cover={cover}
          id={id}
          numberOfSongs={numberOfSongs}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.albums.length > 0 ? (
          <View style={styles.listContainer}>
            <RecyclerListView
              rowRenderer={this._renderRow}
              dataProvider={this.state.dataProvider}
              layoutProvider={this._layoutProvider}
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
    paddingBottom: 70,
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
