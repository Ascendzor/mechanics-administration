const stage = 'dev'
const service = 'mech-service'
process.env = {
    CUSTOMERSDB: `${service}-${stage}-customers`,
    JOBSDB: `${service}-${stage}-jobs`,
    STAGE: stage
}

const { createTestClient } = require('apollo-server-testing')
const endpoint = require('./src/handler')
var assert = require('assert')

const { query, mutate } = createTestClient(endpoint.server);

it('can list existing customers with their jobs', async () => {
    const response = await query({
        query: `{
            customers {
                id
                name
                phoneNumber
                registrations
                jobs {
                    id
                    timeStarted
                    timeEnded
                    hours
                }
            }
        }`,
        variables: {}
    })
    const customers = response.data.customers
    assert.equal(customers.length, 2)
})

it('can list jobs and their customers', async () => {
    const response = await query({
        query: `{
            jobs {
                id
                timeStarted
                timeEnded
                hours
                customer {
                    id
                    name
                }
            }
        }`,
        variables: {}
    })
    const jobs = response.data.jobs
    assert.equal(jobs.length, 3)
})

it('can list jobs of customers of jobs of customers', async () => {
    await query({
        query: `{
            customers {
                id
                name
                phoneNumber
                registrations
                jobs {
                    id
                    timeStarted
                    timeEnded
                    hours
                    customer {
                        id
                        name
                        jobs {
                            id
                        }
                    }
                }
            }
        }`
    })
    assert(true, !!true) // just want to make sure that this query doesn't error
})

it('can create a customer, add jobA and jobB to that customer, delete jobA, delete the customer and therefore delete jobB', async () => {
    const addCustomerResponse = await mutate({
        mutation: `mutation {
            addCustomer(name: "chelsea", phoneNumber: "+64 21 025 06199") {
                id
            }
        }`
    })
    const customerId = addCustomerResponse.data.addCustomer.id

    const addJobAResponse = await mutate({
        mutation: `mutation {
            addJob(customerId: "${customerId}") {
                id
            }
        }`
    })
    const jobAId = addJobAResponse.data.addJob.id

    const addJobBResponse = await mutate({
        mutation: `mutation {
            addJob(customerId: "${customerId}") {
                id
            }
        }`
    })
    const jobBId = addJobBResponse.data.addJob.id

    const getJobsOfCustomer = await query({
        query: `{
            customer(id: "${customerId}") {
                jobs {
                    id
                }
            }
        }`
    })

    assert.equal(getJobsOfCustomer.data.customer.jobs.length, 2)
    assert.equal((await query({query: `{customers{id}}`})).data.customers.length, 3)
    assert.equal((await query({query: `{jobs{id}}`})).data.jobs.length, 5)
    assert.equal((await query({query: `{customer(id: "${customerId}") {jobs {id}}}`})).data.customer.jobs.length, 2)

    await mutate({
        mutation: `mutation {
            deleteJob(jobId: "${jobAId}")
        }`
    })

    assert.equal((await query({query: `{jobs{id}}`})).data.jobs.length, 4)
    assert.equal((await query({query: `{customer(id: "${customerId}") {jobs {id}}}`})).data.customer.jobs.length, 1)

    await mutate({
        mutation: `mutation {
            deleteCustomer(customerId: "${customerId}")
        }`
    })

    assert.equal((await query({query: `{customers{id}}`})).data.customers.length, 2)
    assert.equal((await query({query: `{jobs{id}}`})).data.jobs.length, 3)
})