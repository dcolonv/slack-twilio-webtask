'use latest'
import twilio from 'twilio'

// Sends message to Twilio
const sendMessageToTwilio = (message) => {
  // Get the id and secret from SECRET variables
  const client = twilio(message.clientId, message.secret)
  client.sendMessage({
    to: message.to,
    from: message.from,
    body: message.text
  }, (err, responseData) => {
    if(err) {
      console.error('message to twilio failed!: ', err)
    } else {
      console.log('successfully sent to Twilio!')
    }
  })
}

// Prepare the message to be sent to Twilio
const createMessage = (data) => {
  return {
    to: '+4792067827',
    from: '+4759441131',
    text: `@${data.user_name} in channel ${data.channel_name}: ${data.text}`,
    clientId: data.TWILIO_ID,
    secret: data.TWILIO_SECRET
  }
}

// Exposed endpoint
module.exports = (ctx, done) => {
  if (ctx.data.SLACK_SECRET === ctx.data.token) {
    // Avoid sending messages when slackbot writes in the channel
    if (ctx.data.user_name !== 'slackbot') {
      const message = createMessage(ctx.data)
      sendMessageToTwilio(message)
    }
    return done(null, 'message successfully sent to Twilio!')
  }
  done('Invalid token!')
}
