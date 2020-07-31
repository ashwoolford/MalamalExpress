import React, { useState, useEffect } from 'react';
var { height, width } = Dimensions.get('window');

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Button
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';


const categoryImage = [];

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [productsFirstPage, setProductsFirstPage] = useState([]);
  // const [myMap, setMyMap] = useState(new Map());

  const api =
    'https://malamalexpress.com/wp-json/wc/v3/products/categories?consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';

  const api_banner = 'http://tutofox.com/foodapp/api.json';

  const api_products_first_page = 'https://malamalexpress.com/wp-json/wc/v3/products?page=1&per_page=10&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';


  useEffect(() => {


    fetch(api)
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.error(error))
      .finally(
      );

    fetch(api_banner)
      .then((response) => response.json())
      .then((json) => setBannerData(json.banner))
      .catch((error) => console.error(error))
      .finally();


    fetch(api_products_first_page)
      .then((response) => response.json())
      .then((json) => setProductsFirstPage(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));


  }, []);


  // useEffect(() => {



  //   // console.log('mymap: ', myMap);

  // }, []);

  var myMap = new Map();

  categories.map((item) => {
    if (item.parent != 0) {
      myMap.set(item.parent, true);
    }
  });



  const renderItem = ({ item, index }) => {

    if (item.parent == 0) {
      return (
        <TouchableOpacity style={[styles.divCategorie]}
          onPress={() => {
            console.log(item.slug, myMap.has(item.id))
            if (myMap.has(item.id)) {
              navigation.navigate('SubCategories', {
                categorySlug: item.slug,
                id: item.id
              });
            }
            else {
              navigation.navigate('Products', {
                categorySlug: item.slug,
                id: item.id
              });

            }
          }
          }
        >
          <View style={{
            flex: 1,
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{}}>{item.name}</Text>
          </View>

        </TouchableOpacity>

      );
    }
  };

  const _renderItemFood = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push('Product Details', {
            itemId: item.id,
            otherParam: 'anything you want here',
          });
        }}
        style={styles.divFood}>
        <Image
          style={styles.imageFood}
          resizeMode="contain"
          source={{ uri: item.images[0].src }} />
        <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10, flex: 1 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 20, color: "green" }}>৳{item.price}</Text>
      </TouchableOpacity>
    )
  }

  const keyExtractor = (item) => String(item.id);



  if (isLoading) {
    return (
      <ActivityIndicator />
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View style={{ marginTop: 10, width: width, alignItems: 'center' }}>

          <Swiper style={{ height: width / 2 }} showsButtons={false} autoplay={true} autoplayTimeout={2}>
            {
              bannerData.map((item) => {
                return (
                  <Image style={styles.imageBanner} resizeMode="contain" source={{ uri: item }} />
                )
              })

            }
          </Swiper>
          <View style={{ height: 20 }} />

        </View>

        <View style={{ width: width, borderRadius: 20, paddingVertical: 20, backgroundColor: '#f2f2f2' }}>
          <FlatList
            horizontal={true}
            data={categories}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />

          <FlatList
            data={productsFirstPage}
            numColumns={2}
            renderItem={_renderItemFood}
            keyExtractor={keyExtractor}
          />

        </View>

      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20
  },
  divCategorie: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    padding: 10
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  imageFood: {
    width: ((width / 2) - 20) - 10,
    height: ((width / 2) - 20) - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -20
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
});

export default HomeScreen;
