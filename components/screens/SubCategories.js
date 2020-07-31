import React, { Component } from 'react';
var { height, width } = Dimensions.get('window');
import {
    Image,
    Dimensions,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class SubCategories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            products: [],
            cat_id: this.props.route.params.id,
            navigation: this.props.navigation,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url =
            'https://malamalexpress.com/wc-api/v3/products/categories?consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';

        const api_products_second_page = 'https://malamalexpress.com/wp-json/wc/v3/products?page=2&per_page=10&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';


        this.setState({ loading: true });

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    data: res.product_categories,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({ error, loading: false });
            });


        fetch(api_products_second_page)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    products: res,
                    loading: false,
                });
            })
            .catch((error) => {
            });
    };



    render() {

        const _renderItemFood = ({ item }) => {
            return (
                <TouchableOpacity

                    onPress={() => {
                        this.props.navigation.push('Product Details', {
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


        const renderItem = ({ item }) => {

            // console.log('u ', item.parent);

            if (item.parent == this.state.cat_id) {

                return (
                    <TouchableOpacity style={[styles.divCategorie]}
                        onPress={() => {
                            // console.log(item.slug, myMap.has(item.id))


                            this.state.navigation.navigate('Products', {
                                categorySlug: item.slug,
                                id: item.id
                            });


                        }}>

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

        const keyExtractor = (item) => String(item.id);

        return (
            // <View style={{ flex: 1, backgroundColor: 'white' }}>
            //     <View style={{ padding: 10 }}>
            //         {this.state.loading && this.state.data.length == 0 ? (
            //             <ActivityIndicator />
            //         ) : (
            //                 <FlatList
            //                     data={this.state.data}
            //                     renderItem={renderItem}
            //                     keyExtractor={keyExtractor}
            //                     numColumns={3}
            //                 />
            //             )}
            //     </View>
            // </View>

            <ScrollView>
                <View style={{ flex: 1, width: width, borderRadius: 20, paddingVertical: 20, backgroundColor: '#f2f2f2' }}>
                    <FlatList
                        horizontal={true}
                        data={this.state.data}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                    />

                    <FlatList
                        data={this.state.products}
                        numColumns={2}
                        renderItem={_renderItemFood}
                        keyExtractor={keyExtractor}
                    />

                </View>
            </ScrollView>


        )
    }
}

const styles = StyleSheet.create({
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
        marginRight: 10,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',
    }
});
