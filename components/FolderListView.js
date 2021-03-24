import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Folder from './Folder';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import LayoutProvider from './LayoutProvider';
import { convertListView } from '../store/functions/converters.js';
export default class FolderListView extends Component {
  constructor(props) {
    super(props);
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    const folders = dataProvider.cloneWithRows(convertListView(this.props.folders, 'FOLDERS'),);
    console.log(this.props.folders.length)
    this.state = {
      dataProvider: folders,
    };
    this._layoutProvider = new LayoutProvider(folders);
    this._renderRow = this._renderRow.bind(this);
    this.footer = this.footer.bind(this);
  }

  componentDidUpdate(nextProps) {
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    const { folders } = this.props;
    if (nextProps.folders !== folders) {
      // setTimeout(() => {
        const layout = dataProvider.cloneWithRows(
          convertListView(folders, 'FOLDERS'),
        );
        this.setState({ dataProvider: layout });
      // }, 50);
    }
  }

  _renderRow = (type, data) => {
    const { folder, tracks, folderPath, numberOfSongs, id } = data.item;

    return (
      <Folder
        folderName={folder}
        tracks={tracks}
        id={id}
        folderPath={folderPath}
        numberOfSongs={numberOfSongs}
        openFolderPlaylist={this.props.openFolderPlaylist}
        folder={data.item}
      />
    );
  };

  footer = () => {
    return <View style={{ padding: 35 }}></View>;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.dataProvider._data.length > 0 ? (
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

  listContainer: {
    paddingVertical: 15,
    flex: 1,
  },

  containerGrid: {
    flex: 1,
  },
});
