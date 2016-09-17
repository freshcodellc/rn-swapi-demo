import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


class Root extends Component {
  constructor() {
    super();
    this.renderPeople = this.renderPeople.bind(this);
  }

  componentWillMount() {
    console.log(this.state);
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
      <TouchableOpacity key={i}>
        <Text style={styles.welcome}>
          {person.name}
        </Text>
      </TouchableOpacity>
    );

    return peopleList;
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View>
          { this.renderPeople() }
        </View>
      </View>
    );
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Root;
