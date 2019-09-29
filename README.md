# mechanics-administration

This is an application I have built for experience and code-references in the future. It uses very modern technologies so I suspect this investment will pay itself back many times over.

It is a fullstack application.

## Backend: `/service`
- Infrastructure provider: AWS
- Infrastructure service: Serverless (AWS Lambda + APIGateway)
- Database: Dynamodb
- Language: Node 10
- Interface: GraphQL (Using ApolloServer)

## Frontend: `/spa`
- Bootstrapped: create-react-app
- Language: Typescript
- Framework: react (hooks)
- State-management: react-apollo-hooks
- Routing: use-react-router
- Design: antd

# Mechanics? Administration?

The app is made as though it is serving a mechanics shop. A mechanic needs to store customer details, keep of jobs, these jobs have a relationship with customers, and see analytics on their time/costs/revenue.
