import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button.js';

const reviewSchema = yup.object({
  Name: yup.string()
    .required(),
  Email: yup.string()
    .required()
    .email(),
  DName: yup.string()
    .required(),
  Mobile: yup.string()
    .required()
    .max(10)
    .min(10)
    .matches(new RegExp('[0-9]{10}'), "Phone number is not valid")
});

export default function ReviewForm({ handleUpdateRecord, editDetails }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ Name: editDetails?.Name, Email: editDetails?.Email, DName: editDetails?.DName, Mobile: editDetails?.Mobile.toString() }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          handleUpdateRecord(values, editDetails?.key);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Please enter Name'
              onChangeText={props.handleChange('Name')}
              onBlur={props.handleBlur('Name')} 
              value={props.values.Name}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.Name && props.errors.Name}</Text>

            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Please enter Email'
              onChangeText={props.handleChange('Email')}
              onBlur={props.handleBlur('Email')}
              value={props.values.Email}
            />
            <Text style={globalStyles.errorText}>{props.touched.Email && props.errors.Email}</Text>

            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Please enter Department name'
              onChangeText={props.handleChange('DName')}
              onBlur={props.handleBlur('DName')}
              value={props.values.DName}
            />
            <Text style={globalStyles.errorText}>{props.touched.DName && props.errors.DName}</Text>

            <TextInput 
              style={globalStyles.input}
              placeholder='Please enter Mobile Number'
              onChangeText={props.handleChange('Mobile')}
              onBlur={props.handleBlur('Mobile')} 
              value={props.values.Mobile}
              keyboardType='numeric'
            />
            <Text style={globalStyles.errorText}>{props.touched.Mobile && props.errors.Mobile}</Text>
            
            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}