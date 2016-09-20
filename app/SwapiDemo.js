import React, { Component } from 'react';
import MainNavigator from './navigator';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


class SwapiDemo extends Component {
  constructor() {
    super();
    this.renderPeople = this.renderPeople.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    this.setState({
      people: [],
      isLoading: true
    })

    fetch('https://swapi.co/api/people/')
    .then((res) => res.json())
    .then((response) => {
      this.setState({
        people: response.results,
        isLoading: false
      })
    }).catch((err) => {
      this.setState({
        isLoading: false
      })
      console.log('ERROR: ', err);
    });
  }

  renderPeople() {
    let peopleList = this.state.people.map((person, i) =>
      <TouchableOpacity key={i} onPress={() => this.handlePress(person.url)}>
        <Text style={styles.welcome}>
          {person.name}
        </Text>
      </TouchableOpacity>
    );

    return peopleList;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          { this.state.isLoading &&
            <Text>LOADING...</Text>
          }
          { this.renderPeople() }
        </View>
      </View>
    );
  }

  handlePress(url) {
    this.props.router.toPersonDetail(url);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default SwapiDemo;
