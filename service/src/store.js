const AWS = require('aws-sdk')
const uuidv1 = require('uuid/v1')
const {CUSTOMERSDB, JOBSDB, STAGE} = process.env

const dynamoDb = STAGE === 'dev' ?
    new AWS.DynamoDB.DocumentClient({region: 'localhost', endpoint: 'http://localhost:8000'}) :
    new AWS.DynamoDB.DocumentClient()

const getCustomers = async ({ids}) => {
    const scanResult = await dynamoDb.scan({
        TableName: CUSTOMERSDB,
    }).promise()

    let customers = scanResult.Items

    if(ids) customers = customers.filter(c => ids.includes(c.id))
    
    return customers
}

const putCustomer = async ({name, phoneNumber}) => {
    const newCustomer = {
        id: uuidv1(),
        name,
        phoneNumber,
        registrations: [],
        jobsIds: []
    }

    await dynamoDb.put({
        TableName: CUSTOMERSDB,
        Item: newCustomer
    }).promise()

    return newCustomer
}

const deleteJob = async({id}) => {
    await dynamoDb.delete({
        TableName: JOBSDB,
        Key: {
            id: id
        }
    }).promise()
    
    return true
}

const addJobToCustomer = async({customerId, jobId}) => {
    const customer = (await getCustomers({ids: [customerId]}))[0]
    await dynamoDb.update({
        TableName: CUSTOMERSDB,
        Key: {
            id: customerId
        },
        UpdateExpression: 'set jobsIds = :j',
        ExpressionAttributeValues: {
            ":j": [customer, jobId]
        }
    }).promise()

    return true
}

const deleteCustomer = async ({id}) => {
    await dynamoDb.delete({
        TableName: CUSTOMERSDB,
        Key: {
            id
        }
    }).promise()

    return true
}

const putJob = async ({customerId}) => {
    const newJob = {
        id: uuidv1(),
        customerId,
        timeStarted: (new Date()).toISOString(),
        timeEnded: null,
        hours: 0
    }
    
    const customer = (await getCustomers({ids: [customerId]}))[0]
    const newJobsIds = [...customer.jobsIds, newJob.id]

    await Promise.all([
        dynamoDb.put({
            TableName: JOBSDB,
            Item: newJob
        }).promise(),
        dynamoDb.update({
            TableName: CUSTOMERSDB,
            Key: {
                id: customerId
            },
            UpdateExpression: 'set jobsIds = :j',
            ExpressionAttributeValues: {
                ":j": newJobsIds
            }
        }).promise()
    ])

    return newJob
}

const getJobs = async ({ids}) => {
    const scanResult = await dynamoDb.scan({
        TableName: JOBSDB,
    }).promise()

    let jobs = scanResult.Items

    if(ids) jobs = jobs.filter(j => ids.includes(j.id))
    
    return jobs
}

const getCustomer = async ({id}) => (await getCustomers({ids: [id]}))[0]

module.exports = {
    getCustomers,
    getCustomer,
    putCustomer,
    putJob,
    getJobs,
    deleteCustomer,
    deleteJob,
    addJobToCustomer
} 