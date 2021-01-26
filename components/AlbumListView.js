import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import {RecyclerListView, DataProvider, AutoScroll} from 'recyclerlistview';

import LayoutProvider from './LayoutProvider';

const screenWidth = Dimensions.get('window').width;



export default class AlbumsListView extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(this.props.albums),
    };
    this._layoutProvider = new LayoutProvider(this.state.dataProvider);
    
  }

//   dataConverter = (tracks) => {
//     return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(tracks);
//   };

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    return (
      <View style={styles.container}>
        {this.props.albums.length > 0 ? (
          <View style={styles.listContainer}>
            <RecyclerListView
              rowRenderer={this.props.renderRow}
              dataProvider={this.state.dataProvider}
              layoutProvider={this._layoutProvider}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

// const data = Array(100).fill({type: 'heff', value: 'hello'});



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
    height: 'auto',
    // paddingHorizontal: 10,
    // margin: 5,
  },

  text: {
    color: 'white',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  overlayText: {
    textAlign: 'center',
    paddingBottom: 30,
  },
});
