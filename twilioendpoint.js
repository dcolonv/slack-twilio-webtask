'use latest'
import slackNotify from 'slack-notify'

// Sends message to Slack
const sendMessageToSlack = (message, slackEndpoint) => {
  // Get the endpoint from SECRET variables
  const slack = slackNotify(slackEndpoint)
  slack.send({
    channel: 'bots',
    text: message,
    unfurl_links: 1,
    username: 'David'
  });
}

// Exposed endpoint
module.exports = (ctx, done) => {
  if (ctx.data.AccountSid === ctx.data.TWILIO_ACCOUNT_ID) {
    sendMessageToSlack(ctx.data.Body, ctx.data.SLACK_ENDPOINT)
    return done(null, 'message successfully sent to Slack!')
  }
  done('Invalid token!')
}
