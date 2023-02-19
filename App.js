import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {

  const [selectedcurrency, setSelectedCurrency] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState();
  const [converted, setResult] = useState();

  var myHeaders = new Headers();
  myHeaders.append("apikey", "NSeDMsWm8uojUxLoCVkYQonFeVNTL8CW");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };


  useEffect(() => {
    fetch(`https://api.apilayer.com/exchangerates_data/symbols`, requestOptions)
      .then(response => response.json())
      .then(responseJson => setCurrencies(Object.keys(responseJson.symbols)))
      .catch(error => console.error(error));

  }, []);



  const fetchConvert = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedcurrency}&amount=${amount}`, requestOptions)
      .then(response => response.json())
      .then(responseJson => setResult("="+responseJson.result.toFixed(2)+"€"))
      .catch(error => {
        Alert.alert('Error', error.message);
      });

  }



  return (
    <View style={styles.container}>
      <Text style={styles.item}>Money converter</Text>
      
      <View>
        <View>
          <TextInput
            style={styles.item}
            placeholder={"enter amount here"}
            keyboardType={"number-pad"}
            onChangeText={amount => setAmount(amount)}
            value={amount}
          />
        </View>
        <View style={styles.dropdown}>
          <Picker style={styles.picker}

            selectedValue={selectedcurrency}
            onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
          >
            {
              currencies.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))
            }
          </Picker>
        </View>
        <Text style={styles.item}>{converted}</Text>
      </View>

      <Button
        title='Convert'
        onPress={fetchConvert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  picker: {
    height: 100,
    width: "100%",
    color: 'black',
    justifyContent: 'center',
  },

  item: {
    fontSize: 20,
    marginTop: 20,
  },
  input: {
    border:"2px",
    borderColor:"black",
    borderStyle:"solid"
  },
  dropdown: {
    maxHeight:50,
  }
});