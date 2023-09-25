const Author = require("../models/Author");

const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),

    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },

  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
  },

  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
    updateAuthor: async (parent, args, { mongoDataMethods }) => {
      const authorUpdate = await Author.findByIdAndUpdate(
        args.id,
        { name: args.name, age: args.age },
        { new: true }
      );
      return authorUpdate;
    },
    deleteAuthor: async (parent, args, context, info) => {
      const { id } = args;
      await Author.findByIdAndDelete(id);
      return "Deleted";
    },
  },
};

module.exports = resolvers;
