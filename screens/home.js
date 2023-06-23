import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../shared/card';
import ReviewForm from './reviewForm';
import ReviewFormForEdit from './reviewFormForEdit';
import FlatButton from '../shared/button.js';
import { deleteRecord, updateRecord, addRecord, clearRecord } from '../redux/recordActions';
import { useDispatch, useSelector } from 'react-redux';
import SearchComponent from './SearchComponent';

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenForEdit, setModalOpenForEdit] = useState(false);
  const [editDetails, setEditDetails] = useState()
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records);


  useEffect(() => {
    // Load records from AsyncStorage on component mount
      const loadRecords = async () => {
      const storedRecords = await loadRecordsFromStorage();
      dispatch({ type: 'INITIAL_RECORDS', payload: storedRecords});
    };
    loadRecords();
  }, []);

  const loadRecordsFromStorage = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('records');
      return storedRecords ? JSON.parse(storedRecords) : []
    } catch (error) {
      console.log('Error loading items from AsyncStorage:', error);
    }
  };

  const saveRecordsToStorage = async (records) => {
    try {
      if(records === "clear")
        await AsyncStorage.removeItem('records');
      else{
        await AsyncStorage.setItem('records', JSON.stringify(records));
      }
    } catch (error) {
      console.log('Error saving items to AsyncStorage:', error);
    }
  };

  const handleAddRecord = (record) => {
    record.key = Math.random().toString();
    dispatch(addRecord(record));
    setModalOpen(false);
  };

  const handleUpdateRecord = (record, key) => {
    record.key = key
    dispatch(updateRecord(record));
    setModalOpenForEdit(false)
  };

  const handleDeleteRecord = (key) => {
    dispatch(deleteRecord(key));
  };

  const handleClearRecord = () => {
    dispatch(clearRecord());
    saveRecordsToStorage("clear")
  };

  const handleSaveRecord = () => {
    saveRecordsToStorage(records)
  };

  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.emptyListStyle}
        onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  return (
    <View style={globalStyles.container}>
  
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setModalOpen(false)} 
            />
            <ReviewForm handleAddRecord={handleAddRecord} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={modalOpenForEdit} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setModalOpenForEdit(false)} 
            />
            <ReviewFormForEdit editDetails={editDetails} handleUpdateRecord={handleUpdateRecord} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)} 
      />

      <SearchComponent records={records} />

      <FlatList ListEmptyComponent={EmptyListMessage} data={records} keyExtractor={(item) => item?.key} renderItem={({ item }) => (
        <TouchableOpacity key={item.key} onPress={() => navigation.navigate('RecordDetails', item)}>
          <Card>
            <View style={styles.cardStyle}><Text>Name: </Text><Text style={globalStyles.titleText}>{ item.Name }</Text></View>
            <View style={styles.cardStyle}><Text>Email: </Text><Text style={globalStyles.titleText}>{ item.Email }</Text></View>
            <View style={styles.cardStyle}><Text>DName: </Text><Text style={globalStyles.titleText}>{ item.DName }</Text></View>
            <View style={styles.cardStyle}><Text>Mobile: </Text><Text style={globalStyles.titleText}>{ item.Mobile }</Text></View>
            
            <View style={styles.editDelete}>
        <FlatButton onPress={() => {setEditDetails(item); setModalOpenForEdit(true);}} text='Edit' />
        <View style={styles.space} />
        <FlatButton onPress={() => handleDeleteRecord(item.key)} text='Delete' />
      </View>
            
            
          </Card>
        </TouchableOpacity>
      )} />

      <View style={styles.cardStyle1}>
        <FlatButton onPress={handleClearRecord} text='Clear Record' />
        
        <FlatButton onPress={handleSaveRecord}  text='Save Record' />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  editDelete: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',

  },
  emptyListStyle: {
    textAlign: "center"
  },
  space:{
    height:20,
    width:20
  },
  cardStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardStyle1: {
    marginTop:30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
});