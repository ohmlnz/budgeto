import React, { Component } from 'react';
import { Alert, Text, View, TextInput, Picker, TouchableOpacity } from 'react-native';
import categories from './data/categories.json';
import firebase from 'react-native-firebase';
import { addExpense, updateExpense, addDetail, setLimits } from './helpers/firebase.js';
import { stylesHome } from './css/homescreen.js';

export default class App extends Component {

  state = {
    selection: '',
    input: '',
    description: '',
  }

  submitForm = () => {

    if ((this.state.selection.length == 0) || (this.state.input.length == 0) || (this.state.description.length == 0)) {
      Alert.alert('Empty request', 'You have to select something!');
      return;
    }
    
    let oldValue, ope, newId, lastId, detail_lastId, newValue;
    let date = new Date();
    let fulldate = `${date.getMonth()+1}/${date.getDate()}`;
    let id = Date.now()+1;
    let label = this.state.selection;
    let value = parseInt(this.state.input);
    let descr = this.state.description;

    firebase.database().ref('expenses').once('value', (snapshot) => {  
      const exp = [];
      snapshot.forEach(function(childSnapshot) {
        const obj = childSnapshot.val();
        exp.push(childSnapshot.val());
        if (obj.label === label) {
          oldValue = obj.value;
          newValue = value + obj.value;
          ope = 'update';
          newId = obj.id;
        }
      });
    
      lastId = exp.length > 0? exp[exp.length-1].id+1 : 0; 
      
      if (ope === 'update') {
        firebase.database().ref(`expenses/${newId}/detail`).once('value', (snapshot) => {  
          const exp_detail = [];
          snapshot.forEach(function(childSnapshot) {
            exp_detail.push(childSnapshot.val());
          });

          detail_lastId = exp_detail.length > 0? exp_detail[exp_detail.length-1].id+1 : 0;

          addDetail(newId, detail_lastId, value, fulldate, descr);
          updateExpense(newId, label, newValue, fulldate);
          ope = '';
          oldValue = '';

        });

      } else {
        addExpense(lastId, label, value, fulldate);
        addDetail(lastId, 0, value, fulldate, descr);
      }

    });
      
    this.setState({
      selection: '',
      input: '',
      description: '',
    });
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
          <TextInput
            value={this.state.description}
            style={stylesHome.input}
            placeholder="Enter description here"
            onChangeText={(text) => this.setState({description: text})}
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
            <Text style={stylesHome.buttonText}>{'Submit'.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

