import React, { Component } from 'react';
import _ from 'lodash';
import MainNavigator from './navigator';
import emptyStar from './assets/empty-star.png';
import goldStar from './assets/gold-star.png';
import { WIDTH } from './constants/DimensionConstants';
import { YELLOW, BLACK, WHITE } from './constants/ColorConstants';
import {
  getRealmFavoriteCharactors,
  createRealmFavoriteCharactor,
  destroyRealmFavoriteCharactor
} from './models/favoriteCharactors';
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
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
    this.handleUnfavoritePress = this.handleUnfavoritePress.bind(this);
  }

  componentWillMount() {
    this.setState({
      people: [],
      isLoading: true,
      favorites: getRealmFavoriteCharactors()
    })

    fetch('https://swapi.co/api/people/')
    .then((res) => res.json())
    .then((response) => {
      console.log('response', response)
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
      <View key={i} style={styles.item}>
        <TouchableOpacity style={styles.personWrap} onPress={() => this.handlePress(person.url)}>
          <Text style={styles.person}>
            {person.name}
          </Text>
        </TouchableOpacity>
        {
          _.findIndex(this.state.favorites, { name: person.name }) == -1 &&
          <TouchableOpacity
            style={styles.favoriteWrap}
            onPress={() => this.handleFavoritePress(person.name)}>
            <Image style={styles.favorite} source={emptyStar} resizeMode="contain"/>
          </TouchableOpacity>
        }
        {
          _.findIndex(this.state.favorites, { name: person.name }) != -1 &&
          <TouchableOpacity
            style={styles.favoriteWrap}
            onPress={() => this.handleUnfavoritePress(person.name)}>
            <Image style={styles.favorite} source={goldStar} resizeMode="contain"/>
          </TouchableOpacity>
        }
      </View>
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
          <Image
            style={styles.image}
            source={{url: 'http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/article_main_wide_image/public/2016/07/star_wars_logo.jpg?itok=_Om46Q7C'}}
            resizeMode="contain"/>
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

  handleFavoritePress(name) {
    createRealmFavoriteCharactor(name);
    this.setState({
      favorites: getRealmFavoriteCharactors()
    })
  }

  handleUnfavoritePress(name) {
    destroyRealmFavoriteCharactor(name);
    this.setState({
      favorites: getRealmFavoriteCharactors()
    })
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
    borderColor: YELLOW,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  favoriteWrap: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  favorite: {
    width: 30,
    height: 30
  },
  person: {
    fontSize: 20,
    margin: 10,
    textAlign: 'left',
    color: WHITE
  },
  personWrap: {
    width: WIDTH - 50
  }
});

export default SwapiDemo;
