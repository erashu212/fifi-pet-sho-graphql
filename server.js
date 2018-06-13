const express = require('express');
const expressGraphQL = require('express-graphql');

const http = require('http');
const os = require('os');

const schema = require('./api/product.schema');

const app = express();

const PORT = process.env.PORT || 4200;

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

http.createServer(app)
    .listen(PORT, () => {
        console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
        console.log(`enviroment: ${process.env.NODE_ENV}`);
    });