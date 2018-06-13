const axios = require('axios');
const {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList
} = require('graphql');

const CategoryType = new GraphQLObjectType({
    name: 'CategoryQueryType',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        desc: { type: GraphQLString }
    })
});

const ProductType = new GraphQLObjectType({
    name: 'ProductQueryType',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        desc: { type: GraphQLString },
        category: { type: CategoryType },
        price: {
            type: new GraphQLObjectType({
                name: 'PriceQueryType',
                fields: () => ({
                    amount: { type: GraphQLFloat },
                    discount: { type: GraphQLFloat }
                })
            })
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getProductById: {
            type: ProductType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentVal, args) {
                return axios.get('http://fifi-pet-shop-api.herokuapp.com/api/products/' + args.id)
                    .then(res => res.data)
                    .then(res => res.data);
            }
        },
        getProducts: {
            type: new GraphQLList(ProductType),
            resolve(parentVal, args) {
                return axios.get('http://fifi-pet-shop-api.herokuapp.com/api/products')
                    .then(res => res.data)
                    .then(res => res.data.products)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

