/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView
} from 'react-native';

import config from './config';

const io = require('socket.io-client');
const socket = io(config.endPoint);

export default class reactWebSocket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }

  }

  componentDidMount() {
    socket.on('connected', (data) => {
      this.tambahPesan(data.msg)
    })
}

  tambahPesan(message) {
    const messages = this.state.messages

    messages.push(message)

    this.setState({
      messages
    })
  }

  mintaTulisan() {
    socket.emit('pinged')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Message from Server
        </Text>
        <ScrollView style={styles.messageContainer}>
          { this.state.messages.map((item, idx) =>
            <View key={'messageContainer-' + idx} style={styles.messageItemContainer}>
              <Text key={'messageIndicator-' + idx} style={styles.messageItemIndicator}> >  </Text>
              <Text style={styles.messageItemText} key={'message-' + idx}>{item}</Text>
            </View>
          ) }
        </ScrollView>
        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={() => this.mintaTulisan()}>
          <Text style={{color: 'white'}}>PING!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    margin: 16,
  },

  confirmButton: {
    backgroundColor: '#5555ff',
    alignItems: 'center',
  },

  messageItemText: {
    flex: 1,
  },

  messageItemIndicator: {
    fontWeight: 'bold',
    width: 16,
  },

  messageItemContainer: {
    flexDirection: 'row',
  },

  messageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    margin: 16,
    marginBottom: 0,
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 16,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactWebSocket', () => reactWebSocket);
