const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to MongoDB
const connectDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://zano:7275456455@cluster0.onlqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message, "err")
		process.exit(1)
	}
}

connectDB()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ mongoDataMethods })
})

const app = express()
app.use(cors())
server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 4000 }, () =>
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
