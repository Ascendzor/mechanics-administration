const store = require('./store')
const { ApolloServer, gql } = require('apollo-server-lambda')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    customers: [Customer]
    customer(id: String): Customer
    jobs: [Job]
    job(id: String): Job
  }

  type Mutation {
    addCustomer(name: String!, phoneNumber: String!): Customer
    addJob(customerId: String!): Job
    deleteCustomer(customerId: String!): Boolean
    deleteJob(jobId: String!): Boolean
  }

  type Customer {
    id: ID!
    name: String!
    phoneNumber: String!
    registrations: [String]!
    jobs: [Job]!
  }

  type Job {
    id: ID!
    customer: Customer!
    timeStarted: String!
    timeEnded: String
    hours: Float!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    customers: async () => {
      return await store.getCustomers({})
    },
    customer: async (obj, args, context, info) => {
      const customer = (await store.getCustomers({ids: [args.id]}))[0]
      return customer
    },
    jobs: async () => {
      return await store.getJobs({})
    }
  },
  Mutation: {
    addCustomer: async (obj, args, context, info) => {
      console.log({obj, args, context, info})
      const customer = await store.putCustomer({
        name: args.name,
        phoneNumber: args.phoneNumber
      })
      
      return customer
    },
    addJob: async (obj, args, context, info) => {
      console.log({obj, args, context, info})
      const job = await store.putJob({
        customerId: args.customerId
      })

      await store.addJobToCustomer

      return job
    },
    deleteCustomer: async (obj, args, context, info) => {
      console.log({obj, args, context, info})
      const customer = await store.getCustomer({id: args.customerId})
      await Promise.all([
        ...customer.jobsIds.map(id => store.deleteJob({id})),
        store.deleteCustomer({id: customer.id})
      ])

      return true
    },
    deleteJob: async (obj, args, context, info) => {
      console.log({obj, args, context, info})
      await store.deleteJob({id: args.jobId})

      return true
    }
  },
  Job: {
    customer: async (job, args) => {
      console.log('---------- Job: customer')
      console.log({job, args})
      const customer = await store.getCustomer({id: job.customerId})
      return customer
    }
  },
  Customer: {
    jobs: async (customer, args) => {
      console.log('---------- Customer: jobs')
      console.log({customer, args})
      const jobs = await store.getJobs({ids: customer.jobsIds})
      return jobs
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers })

exports.graphql = server.createHandler({
  cors: {
    origin: '*'
  },
})

exports.server = server