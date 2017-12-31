import React, { Component } from 'react';
import { Alert, Text, View, TextInput, Picker, TouchableOpacity } from 'react-native';
import categories from './data/categories.json';
import firebase from 'react-native-firebase';
import { addExpense, updateExpense } from './helpers/firebase.js';
import { stylesHome } from './css/homescreen.js';

export default class App extends Component {

  state = {
    selection: '',
    input: ''
  }

  submitForm = () => {

    if ((this.state.selection.length == 0) || (this.state.input.length == 0)) {
      Alert.alert('Empty request.', 'You have to select something!');
      return;
    }
    
    let ope;
    let total;
    let newId;
    let lastId;
    let date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let fulldate = `${month}/${day}`;
    let id = Date.now()+1;
    let label = this.state.selection;
    let value = parseInt(this.state.input);

    firebase.database().ref('expenses').once('value', (snapshot) => {  
      total = snapshot.numChildren(); 
      const a = [];
      snapshot.forEach(function(childSnapshot) {
        const obj = childSnapshot.val();
        a.push(childSnapshot.val());
        if (obj.label === label) {
          value = value + obj.value;
          ope = 'update';
          newId = obj.id;
        }
      });
    
      lastId = a.length > 0? a[a.length-1].id+1 : 0; 
      
      if (ope === 'update') {
        updateExpense(newId, label, value, fulldate); 
        ope = '';
      } else {
        addExpense(lastId, label, value, fulldate); 
      }
    });
      
    this.setState({
      selection: '',
      input: ''
    })
  }
  

  changeSelect = (val) => {
    if (val !== 0) {
      this.setState({selection: val});
    }
  }

  render() {
    return (
      <View style={stylesHome.container}>
        <View style={stylesHome.wrapper}>
          <Text style={stylesHome.title}>Budgeto</Text>
          <TextInput
            value={this.state.input}
            style={stylesHome.input}
            placeholder="Enter expense here"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({input: text})}
          />
          <Picker style={stylesHome.select}
            selectedValue={this.state.selection}
            onValueChange={this.changeSelect}
            prompt="Categories"
          >
            {categories.map((c, index)=>
              <Picker.Item key= {index} label={c.label} value={c.value} />
            )}
          </Picker>
          <TouchableOpacity
            onPress={() => Alert.alert(
              'Add your expense',
              `Add ${this.state.input}$ to ${this.state.selection}?`,
              [
                {text: 'Add', onPress: () => this.submitForm()},
                {text: 'Cancel', onPress: () => console.log('bye')}
              ],
              { cancelable: false }
            )}
            style={stylesHome.button}>
            <Text style={stylesHome.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={stylesHome.results} onPress={() => this.props.navigation.navigate('Data')}>
          <Text>See results &#8594;</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

