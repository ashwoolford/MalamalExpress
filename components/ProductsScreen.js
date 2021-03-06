import React, { Component } from 'react';

import { Button, Card, SearchBar } from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component';
import { postCart } from '../actions';
import { connect } from 'react-redux';
import {
  Image,
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Products from './Products';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      loadingMore: false,
      categorySlug: this.props.route.params.categorySlug,
      id: this.props.route.params.id,
      navigation: this.props.navigation,
    };

    // this.arrayholder = [];
  }




  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    // const url =
    //   'https://malamalexpress.com/wc-api/v3/products/?&filter[category]=' +
    //   this.state.id +
    //   '&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667&per_page=100';

    const url = 'https://malamalexpress.com/wp-json/wc/v3/products?category=' + this.state.id + '&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667&page=' + this.state.page;
    this.setState({ loading: true });

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data:
            this.state.page === 1
              ? Array.from(res)
              : [... this.state.data, ...res]
          ,
          error: res.error || null,
          loading: false,
          loadingMore: false,

        });
      })
      .catch((error) => {
        console.log('getting error');
        this.setState({ error, loading: false });
      });
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.title.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        this.makeRemoteRequest();
      }
    );
  };


  _renderFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          // borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };




  renderHeader = () => {
    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </View>
    );
  };

  render() {
    console.log('id ' + this.state.data[0]);
    console.log('heyt this is url', this.state.data);
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => {
            return (
              <View style={{ padding: 0 }}>
                <Products item={item} navigation={this.state.navigation} />
              </View>
            );
          }}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this._renderFooter}
          numColumns={2}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

export default connect(null, { postCart })(ProductsScreen);
