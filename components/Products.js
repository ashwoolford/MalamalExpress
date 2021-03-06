import React, { Component } from 'react';

import { Button, Card } from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component';
import { postCart } from '../actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Image,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

var { height, width } = Dimensions.get('window');

class Products extends Component {
  render() {
    return (
      // <View
      //   style={{
      //     padding: 10,
      //     flexDirection: 'row',
      //   }}>
      //   <View
      //     style={{
      //       height: 280,
      //       width: 186,
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //       backgroundColor: 'white',

      //       borderRadius: 10,
      //       shadowColor: '#222',
      //       shadowOffset: { width: 0.5, height: 0.5 },
      //       shadowOpacity: 0.5,
      //       shadowRadius: 10,
      //       elevation: 2,
      //     }}>
      //     <Image
      //       style={{ width: 120, height: 120 }}
      //       source={{
      //         uri: this.props.item.featured_src,
      //       }}
      //     />
      //     <Text
      //       style={{
      //         marginBottom: 10,
      //         marginTop: 20,
      //         textAlign: 'center',
      //       }}
      //       h2>
      //       {this.props.item.title}
      //     </Text>
      //     <Text style={{ padding: 10 }} h4>
      //       {this.props.item.price} ৳
      //     </Text>
      //     <View style={{ padding: 5, flex: 1, marginLeft: -50 }}>
      //       <Button
      //         onPress={() => {
      //           /* 1. Navigate to the Details route with params */
      //           this.props.navigation.push('Product Details', {
      //             itemId: this.props.item.id,
      //             otherParam: 'anything you want here',
      //           });
      //         }}
      //         type="outline"
      //         title="View Details"
      //         size={10}
      //       />
      //     </View>
      //     <View style={{ flex: 2, marginTop: -30, marginLeft: 120 }}>
      //       <Button
      //         onPress={() => {
      //           this.props.postCart(
      //             this.props.item.id,
      //             this.props.item.title,
      //             this.props.item.price,
      //           );
      //         }}
      //         icon={<Icon name="md-cart" size={23} color="white" />}
      //         iconRight
      //       />
      //     </View>
      //   </View>
      // </View>

      <TouchableOpacity
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.push('Product Details', {
            itemId: this.props.item.id,
            otherParam: 'anything you want here',
          });
        }}
        style={styles.divFood}
      >
        <Image
          style={styles.imageFood}
          resizeMode="contain"
          source={{ uri: this.props.item.images[0].src }} />
        <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10, flex: 1 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
          {this.props.item.name}
        </Text>
        <Text style={{ fontSize: 20, color: "green" }}>৳{this.props.item.price}</Text>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  imageFood: {
    width: ((width / 2) - 20) - 10,
    height: ((width / 2) - 20) - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  divFood: {
    flex: 1,
    flexDirection: "column",
    width: (width / 2) - 20,
    padding: 10,
    height: width / 1.5,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  }
})

export default connect(null, { postCart })(Products);
