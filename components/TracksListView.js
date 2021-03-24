import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Track from './Track';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import LayoutProvider from './LayoutProvider';
import { convertListView } from '../store/functions/converters.js';
import { ThemeProvider } from '@react-navigation/native';

export default class TracksListView extends Component {
  constructor(props) {
    super(props);

    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    const tracks = convertListView(this.props.tracks, 'TRACKS');
    this.state = {
      dataProvider: dataProvider.cloneWithRows(tracks),
    };
    this._layoutProvider = new LayoutProvider(
      dataProvider.cloneWithRows(tracks),
    );
    this._renderRow = this._renderRow.bind(this);
    this.footer = this.footer.bind(this);
  }

  _renderRow = (type, data) => {
    const { title, artist, displayDuration, id } = data.item;

    return (
      <Track
        title={title}
        artist={artist}
        id={id}
        displayDuration={displayDuration}
        light={this.props.light}
        nowPlayingView={this.props.nowPlayingView}
        playlist={this.props.tracks}
        track={data.item}
      />
    );
  };

  componentDidUpdate(nextProps) {
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    const { tracks } = this.props;
    if (nextProps.tracks !== tracks) {
      const data = convertListView(tracks, 'TRACKS');
      this.setState({ dataProvider: dataProvider.cloneWithRows(data) });
      this._layoutProvider = new LayoutProvider(
        dataProvider.cloneWithRows(data),
      );
    }
  }

  footer = () => {
    return <View style={{ padding: 35 }}></View>;
  };

  render() {
    //  console.log(this.state.dataProvider._data.length)
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
