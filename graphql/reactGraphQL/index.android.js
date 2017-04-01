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
    TouchableOpacity,
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
                <Text style={{ fontSize: 20, paddingTop: 12 }}>Book List</Text>
                <ListView
                    style={styles.listItem}
                    dataSource={this.state.books}
                    renderRow={item => this.renderItem(item)}>
                </ListView>
            </View>
        );
    }

    down(id) {
        downvote(id).then(items => this.reloadList(items))
    }

    up(id) {
        upvote(id).then(items => this.reloadList(items))
    }

    reloadList(items) {
        this.setState({
            books: ds.cloneWithRows(items)
        })
    }

    refresh() {
        fetchItems().then(items => this.reloadList(items)).catch(err => console.log(err))
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {flexDirection: 'row'}]}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1}} >
                        <TouchableOpacity onPress={() => this.up(item.id)} style={styles.button}>
                            <Text>^</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.down(item.id)} style={styles.button}>
                            <Text>v</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', paddingTop: 12 }}>{item.vote}</Text>
                    </View>
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.author}>Written By {item.author}</Text>
                </View>
            </View>
        )
    }
}

async function upvote(id) {
    const responses = await fetch(config.endPoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
        body: `mutation { upvote(id: ${id}) }`,
    })

    return await fetchItems()
}

async function downvote(id) {
    const responses = await fetch(config.endPoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
        body: `mutation { downvote(id: ${id}) }`,
    })

    return await fetchItems()
}

async function fetchItems() {
    const responses = await fetch(config.endPoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
        body: `{ books { id title author vote } }`,
    })

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
    button: {
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#ddd',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('reactGraphQL', () => reactGraphQL);
