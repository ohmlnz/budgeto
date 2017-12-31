import firebase from 'react-native-firebase';

export const addExpense = (lastId, label, value, fulldate) => {
	firebase.database().ref('expenses/' + lastId).set({
	  id: lastId,
	  label: label,
	  value: value,
	  date: fulldate
	});
}

export const updateExpense = (newId, label, value, fulldate) => {
	firebase.database().ref('expenses/' + newId).update({
	  id: newId,
	  label: label,
	  value: value,
	  date: fulldate
	});
}

