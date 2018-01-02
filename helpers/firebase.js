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

export const addDetail = (newId, detail_lastId, value, fulldate, descr) => {
	firebase.database().ref(`expenses/${newId}/detail/${detail_lastId}`).set({
		id: detail_lastId,
		value: value,
		date: fulldate,
		description: descr
	});
}

export const setLimits = (key, value) => {
	firebase.database().ref('limits').set({
		key: value
	})
}

