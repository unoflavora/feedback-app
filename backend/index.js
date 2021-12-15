const app = require('./app')
const http = require('http')
var cron = require('node-cron');

const resetServer = require('./reset/reset')
cron.schedule('0 0 * * *', async () => {
  await resetServer.resetPost() //refresh DB every day at 00:00
});

const server = http.createServer(app)

server.listen(3000, () => {
  console.log('Server running on port 3000')
})