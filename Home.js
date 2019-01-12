/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';


export default class App extends Component {

  state = {
    items: [],
    refreshing: false,
    text: '',
  }

  page =0;

  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1;
    fetch(`https://api.github.com/search/repositories?q=${this.state.text}&${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;
        if (refreshing) {
          this.setState({ items: items , refreshing: false })
        } else {
          this.setState({ items: [...this.state.items, ...items], refreshing: false })
        }
      });
  }

  navigateToDetail(item) {
    this.props.navigation.push('Detail', { item, headerTitle: item.name });
  }

  //ここからrender()
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({ text })}></TextInput>
          <TouchableOpacity onPress={() => this.fetchRepositories(true) }>
            <Text sytle={styles.search}>検索</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data = { this.state.items }
          renderItem = {({ item }) => 
          <TouchableOpacity onPress={() => this.navigateToDetail(item)} style={{ padding: 10, backgroundColor: '#ddd', borderBottomWidth: 1, borderBottomColor: '#000', }}>
            <Text style={{padding: 5, fontSize: 20, fontWeight: 'bold', paddingBottom: 10, }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }} />
              <Text style={styles.ownerName}>{ item.owner.login }</Text>
            </View>
          </TouchableOpacity>
         }
          // keyExtractor = {(item) => item.id }
          keyExtractor = {(item) => (item.id + item.name ).toString()}
          onEndReached = {() => this.fetchRepositories()}
          onEndReachedThreshold = {0.1}
          onRefresh={() => this.fetchRepositories(true)}
          //trueの時リフレッシュインジケータが表示される。onRefreshの後に書く。
          refreshing = {this.state.refreshing}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  search: {
    padding: 10,
    backgroundColor: '#555',
    fontWeight: 'bold',
  },
  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14,
  },
});
