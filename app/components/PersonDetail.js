import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
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
        <TouchableOpacity onPress={this.handleBackPress}>
          <Text>BACK</Text>
        </TouchableOpacity>
        { this.state.isLoading &&
          <ActivityIndicator size='large'/>
        }
        { this.state.person.name &&
          <View>
            <Text>Name: {this.state.person.name}</Text>
            <Text>Height: {this.state.person.height}</Text>
            <Text>Mass: {this.state.person.mass}</Text>
            <Text>Hair Color: {this.state.person.hair_color}</Text>
            <Text>Skin Color: {this.state.person.skin_color}</Text>
            <Text>Eye Color: {this.state.person.eye_color}</Text>
            <Text>Birth Year: {this.state.person.birth_year}</Text>
            <Text>Gender: {this.state.person.gender}</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default PersonDetail;
