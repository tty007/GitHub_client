import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, } from 'react-native';

export default class Detail extends Component {

  render () {
    // const { params } = this.props.navigation.state;
    const { navigation: { state: { params: { item }}} } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.fullName}>{item.full_name}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', }}>
          <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }} />
          <Text style={styles.ownerName}>{ item.owner.login }</Text>
        </View>
        <Text style={styles.description}>{ item.description }</Text>
        <Text style={styles.repoUrl}>{ item.url }</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eee',
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ownerIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14,
  },
  description: {
    padding: 10,
    backgroundColor: '#333',
    color: '#fff',
  },
  repoUrl: {
    marginTop: 10,
    marginBottom: 10,
  },
})