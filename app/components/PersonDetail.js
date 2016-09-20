import React, { Component } from 'react';
import { WIDTH, HEIGHT } from '../constants/DimensionConstants';
import { YELLOW, BLACK, WHITE } from '../constants/ColorConstants';
import backIcon from '../assets/back-icon.png';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class PersonDetail extends Component {
  constructor() {
    super();
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentWillMount() {
    const { url } = this.props;
    this.setState({
      person: {},
      isLoading: true
    })

    fetch(url)
    .then((res) => res.json())
    .then((response) => {
      this.setState({
        person: response,
        isLoading: false
      })
    }).catch((err) => {
      this.setState({
        isLoading: false
      })
      console.log('ERROR: ', err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={this.handleBackPress}>
            <Image style={styles.image} source={backIcon} resizeMode="contain"/>
          </TouchableOpacity>
        </View>
        { this.state.isLoading &&
          <ActivityIndicator size='large'/>
        }
        { this.state.person.name &&
          <View style={styles.info}>
            <Text style={styles.attribute} >Name: {this.state.person.name}</Text>
            <Text style={styles.attribute} >Height: {this.state.person.height}</Text>
            <Text style={styles.attribute} >Mass: {this.state.person.mass}</Text>
            <Text style={styles.attribute} >Hair Color: {this.state.person.hair_color}</Text>
            <Text style={styles.attribute} >Skin Color: {this.state.person.skin_color}</Text>
            <Text style={styles.attribute} >Eye Color: {this.state.person.eye_color}</Text>
            <Text style={styles.attribute} >Birth Year: {this.state.person.birth_year}</Text>
            <Text style={styles.attribute} >Gender: {this.state.person.gender}</Text>
          </View>
        }
      </View>
    );
  }

  handleBackPress() {
    this.props.router.pop();
  }
}

const styles = StyleSheet.create({
  attribute: {
    color: WHITE,
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  info: {
    width: WIDTH,
    height: HEIGHT - 80,
    position: 'absolute',
    top: 80,
    backgroundColor: BLACK,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  menu: {
    width: WIDTH,
    height: 80,
    position: 'absolute',
    top: 0,
    backgroundColor: BLACK,
    borderBottomWidth: 2,
    borderColor: YELLOW
  },
  image: {
    width: WIDTH / 2,
    height: 80,
  }
});

export default PersonDetail;
