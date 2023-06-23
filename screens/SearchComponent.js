import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchComponent = ({records}) => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const dispatch = useDispatch();
    // Replace this dummy data with your actual data source
    const data = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      // ... more data
    ];
  
    const handleSearch = async (text) => {
      setSearchText(text);
  
      // Filter the data based on the search text
      const filtered = records.filter(
        (item) =>
          item.Name.toLowerCase().includes(text.toLowerCase()) ||
          item.Email.toLowerCase().includes(text.toLowerCase())
      );
    //   console.log("oh yes", filtered)
    //   setFilteredData(filtered);
    if(text.trim() === ""){
        const storedRecords = await AsyncStorage.getItem('records');
        dispatch({ type: 'SEARCH_RECORDS', payload: storedRecords ? JSON.parse(storedRecords) : []});
    }
    else{
        dispatch({ type: 'SEARCH_RECORDS', payload: filtered});
    }
    };
  
    // const renderItem = ({ item }) => (
    //   <View>
    //     {/* Replace this with your actual item rendering */}
    //     <Text>{item.Name}</Text>
    //     <Text>{item.Email}</Text>
    //   </View>
    // );
  
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
        {/* <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        /> */}
      </View>
    );
  };

  const styles = StyleSheet.create({
    cardStyle: {
      borderWidth: 1,
      borderColor: "lightgrey",
      borderRadius: 5,
    //   borderStyle: solid,
      marginLeft: 10
    },
  });
  
  export default SearchComponent;
  