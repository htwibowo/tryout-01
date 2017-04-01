/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
} from 'react-native';

import config from './config'

const { width } = Dimensions.get('window')
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class reactGraphQL extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: ds.cloneWithRows([])
        }

        this.refresh()
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={styles.listItem} dataSource={this.state.books} renderRow={item => this.renderItem(item)}></ListView>
            </View>
        );
    }

    refresh() {
        fetchItems().then(items => {
            this.setState({
                books: ds.cloneWithRows(items)
            })
        }).catch(err => console.log(err))
    }

    renderItem(item) {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>Written By {item.title}</Text>
            </View>
        )
    }
}

async function fetchItems() {
    const responses = await fetch(config.endPoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
        body: `{ books { id title author synopsis } }`,
    })

    console.log('YEAY BOOKS!', JSON.parse(responses._bodyText).data.books)
    return JSON.parse(responses._bodyText).data.books
}

const styles = StyleSheet.create({
    item: {
        padding: 16
    },
    title: { fontSize: 16 },
    author: { fontSize: 12, color: '#444', borderBottomColor: '#ddd', borderBottomWidth: 1 },
    listItem: {
        flex: 1,
        width
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('reactGraphQL', () => reactGraphQL);
