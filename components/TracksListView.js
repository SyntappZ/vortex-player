import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Track from './Track';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import LayoutProvider from './LayoutProvider';

export default class TracksListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(this.props.tracks),
    };
    this._layoutProvider = new LayoutProvider(this.state.dataProvider);
    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow = (type, data) => {
    const {title, author, displayDuration, id} = data.item;

    return (
      <Track
        title={title}
        author={author}
        id={id}
        displayDuration={displayDuration}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.tracks.length > 0 ? (
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

  listContainer: {
    paddingVertical: 15,
    flex: 1,
  },

  containerGrid: {
    flex: 1,
  },
});
