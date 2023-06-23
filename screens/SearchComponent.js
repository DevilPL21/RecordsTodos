import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchComponent = ({records}) => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const dispatch = useDispatch();
  
    const handleSearch = async (text) => {
      setSearchText(text);
  
      // Filter the data based on the search text
      const filtered = records.filter(
        (item) =>
          item.Name.toLowerCase().includes(text.toLowerCase()) ||
          item.Email.toLowerCase().includes(text.toLowerCase())
      );
    if(text.trim() === ""){
        const storedRecords = await AsyncStorage.getItem('records');
        dispatch({ type: 'SEARCH_RECORDS', payload: storedRecords ? JSON.parse(storedRecords) : []});
    }
    else{
        dispatch({ type: 'SEARCH_RECORDS', payload: filtered});
    }
    };
  
    return (
      <View>
        <View>
          <TextInput
            placeholder="Search by name or email"
            value={searchText}
            onChangeText={handleSearch}
            style={styles.cardStyle}
          />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    cardStyle: {
      borderWidth: 1,
      borderColor: "lightgrey",
      borderRadius: 5,
      marginLeft: 10
    },
  });
  
  export default SearchComponent;
  
