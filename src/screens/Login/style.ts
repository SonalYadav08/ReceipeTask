import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 20,
  },

  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default styles;
