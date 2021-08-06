/* eslint-disable no-async-promise-executor */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

const SITE_ID = 'a55bf176-2002-45de-806a-f43bc5225fc2'
const TOKEN = 'hmt1Abg8KuilDqAFgSfJ4aF4b5BG7wWd-EjYZY3Q4d8'

function getAuthHeader() {
  return { Authorization: `Bearer ${TOKEN}` }
}

async function deploy(deployId) {
  const { data } = await axios({
    url: `https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys/${deployId}/restore`,
    method: 'POST',
    headers: getAuthHeader(),
  })
  return data.state
}

async function checkStatusAndDeploy(deployId) {
  const { data } = await axios({
    url: `https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys/${deployId}`,
    method: 'GET',
    headers: getAuthHeader(),
  })
  console.log('Current build status - ', data.state)
  if (data.state === 'ready') {
    await deploy(deployId)
    console.log(`Build with id ${deployId} is published`)
  } else {
    setTimeout(() => checkStatusAndDeploy(deployId), 5000)
  }
}

async function start() {
  const { data } = await axios({
    url: `https://api.netlify.com/api/v1/sites/${SITE_ID}/builds`,
    method: 'POST',
    headers: getAuthHeader(),
  })

  console.log(`Start build and deploy with id - ${data.deploy_id}`)
  await checkStatusAndDeploy(data.deploy_id)
}

start()
