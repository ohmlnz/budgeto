import { StyleSheet } from 'react-native';

export const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 25
  },
  input: {
    width: 150,
    height: 50,
    textAlign: 'center',
    marginBottom: 10
  },
  select: {
    width: 180
  },
  button: {
    width: 150
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 15,
    fontWeight: 'bold'
  },
  results: {
    alignItems: 'flex-end',
    marginRight: 35,
    marginBottom: 25
  }
});