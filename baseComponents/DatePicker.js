import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const DatePicker = ({ label, icon, onDateChange, value }) => {
  const [date, setDate] = useState(value || new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      {label && <Text style={{ marginBottom: 5 }}>{label}</Text>}
      <TouchableOpacity onPress={showDatepicker} style={styles.datePickerContainer}>
        {icon && <Ionicons name={icon} size={24} color="black" />}
        <Text style={styles.dateText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = {
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
  },
};

export default DatePicker;
