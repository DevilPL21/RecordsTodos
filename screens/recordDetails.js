import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles, images } from '../styles/global';
import Card from '../shared/card';

export default function RecordDetails({ navigation }) {
  
  return (
    <View style={globalStyles.container}>
      <Card>
      <View style={styles.cardStyle}><Text>Name: </Text><Text style={globalStyles.titleText}>{ navigation.getParam('Name') }</Text></View>
    <View style={styles.cardStyle}><Text>Email: </Text><Text style={globalStyles.titleText}>{ navigation.getParam('Email') }</Text></View>
    <View style={styles.cardStyle}><Text>DName: </Text><Text style={globalStyles.titleText}>{ navigation.getParam('DName') }</Text></View>
    <View style={styles.cardStyle}><Text>Mobile: </Text><Text style={globalStyles.titleText}>{ navigation.getParam('Mobile') }</Text></View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});