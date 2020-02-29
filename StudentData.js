
import React, { Component } from 'react';

import { TouchableOpacity , StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform} from 'react-native';

export default class StudentData extends Component {
  
  constructor(props)
  {
    super(props);
    this.state = { 
    isLoading: true
  }
  }

  componentDidMount() {
    
       return fetch('https://mentorstudent.000webhostapp.com/studentdata.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetFlatListItem (name) {
   
  Alert.alert(name);

  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

<View style={styles.MainContainer}>
  
       <FlatList
       
          data={ this.state.dataSource }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => <Text style={styles.FlatListItemStyle} 
                                        onPress={this.GetFlatListItem.bind(this, item.name)}>
                                    ID: {item.id} 
                                  </Text> }
          keyExtractor={(item, index) => index}
          
         />
    
    
</View>
            
    );
  }
}

const styles = StyleSheet.create({

MainContainer :{

justifyContent: 'center',
flex:1,
marginTop: 20,
margin: 10,
paddingTop: (Platform.OS === 'android') ? 20 : 0,

},

FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});
