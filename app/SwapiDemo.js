import React, { Component } from 'react';
import MainNavigator from './navigator';
import { WIDTH } from './constants/DimensionConstants';
import { YELLOW, BLACK, WHITE } from './constants/ColorConstants';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
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
        <View style={styles.item}>
          <Text style={styles.welcome}>
            {person.name}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return peopleList;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
          { this.state.isLoading &&
            <ActivityIndicator size='large'/>
          }
          <Image style={styles.image} source={{url: 'http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/article_main_wide_image/public/2016/07/star_wars_logo.jpg?itok=_Om46Q7C'}} resizeMode="contain"/>
          <ScrollView>
            { this.renderPeople() }
          </ScrollView>
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
    backgroundColor: BLACK
  },
  image: {
    width: WIDTH,
    height: 80
  },
  item: {
    width: WIDTH,
    borderBottomWidth: 2,
    borderColor: YELLOW
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'left',
    color: WHITE
  },
});

export default SwapiDemo;
