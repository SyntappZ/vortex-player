import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Track from './Track';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import LayoutProvider from './LayoutProvider';
import {convertListView} from '../store/functions/converters.js';
import { ThemeProvider } from '@react-navigation/native';

export default class TracksListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(convertListView(this.props.tracks, 'TRACKS')),
    };
    this._layoutProvider = new LayoutProvider(this.state.dataProvider);
    this._renderRow = this._renderRow.bind(this);
    this.footer = this.footer.bind(this)
  }

  _renderRow = (type, data) => {
    const {title, author, displayDuration, id} = data.item;

    return (
      <Track
        title={title}
        author={author}
        id={id}
        displayDuration={displayDuration}
        light={this.props.light}
      />
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
        {this.props.tracks.length > 0 ? (
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
