import {StyleSheet, Dimensions} from 'react-native';
const screnWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 24,
    color: 'red',
    textAlign: 'center',
    fontWeight: '900',
    marginVertical: 15,
  },
  listview: {
    flex: 1,
    marginVertical: 6,
  },
  renderItemView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center',
  },
  recipeImage: {
    width: 90,
    height: 80,
    borderRadius: 8,
  },
  recipeView: {
    padding: 10,
    alignItems: 'flex-start',
    width: screnWidth / 1.7,
  },
  recipeName: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  searchBarContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  emptyList: {
    alignItems: 'center',

    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default styles;
