import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import {getRecipes, searchRecipes} from '../../services/api';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [recipeList, setRecipeList] = useState([]);
  const {theme} = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getReceipe();
  }, []);

  const getReceipe = async () => {
    let data = await getRecipes();
    setRecipeList(data.recipes);
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);

    if (text.trim()) {
      let data = await searchRecipes(text);

      setRecipeList(data?.recipes);
    } else {
      getReceipe();
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={[styles.renderItemView, {backgroundColor: theme.cardColor}]}>
        <Image source={{uri: item.image}} style={styles.recipeImage} />
        <View style={styles.recipeView}>
          <Text style={[styles.recipeName, {color: theme.textColor}]}>
            {item.name}
          </Text>
          <Text style={[styles.recipeName, {color: theme.textColor}]}>
            {`Cuisine- ${item.cuisine}`}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[styles.rating, {color: theme.textColor, fontSize: 15}]}>
              {`${item.rating} `}
            </Text>
            <Ionicons name="star-sharp" color="#f8e71c" size={17} />
            <Text
              style={[styles.rating, {color: theme.textColor, fontSize: 14}]}>
              {` (${item.reviewCount}) `}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.label, {color: theme.textColor}]}>
        {'Receipies'}
      </Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[
            styles.searchBar,
            {color: theme.textColor, backgroundColor: theme.cardColor},
          ]}
          placeholder="Search recipes"
          placeholderTextColor={theme?.textColor}
          value={searchQuery}
          onChangeText={handleSearch} // Trigger search on every text change
        />
      </View>
      <View style={styles.listview}>
        <FlatList
          initialNumToRender={4}
          data={recipeList}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={[styles.emptyList, {color: theme.textColor}]}>
              No items available
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
