const WebSocket = require('ws');
const TaskRouter = require("twilio-taskrouter");
const Twilio = require("twilio");
const AccessToken = Twilio.jwt.AccessToken;
const TaskRouterGrant = AccessToken.TaskRouterGrant;

function connectSocket(){
  const socketUrl = 'wss://socket.windshieldhub.com?user_id=7&peer_id=testPeerId';
  
  let connection = new WebSocket(socketUrl);
    // Send ping frame every 30 seconds
    setInterval(() => {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify({ ping: "ping" })); // Send a ping frame
      } else {
        // clearInterval(pingInterval);
      }
    }, 30000);
    connection.onopen = event => {console.log('open')};
    connection.onmessage = event => {console.log('onmessage')};
    connection.onerror = event => {console.log('onerror')};
    connection.onclose = event => {console.log('onclose')};
    connection.ondisconnect = event =>
    {console.log('ondisconnect')}
}

function createAccessToken(
  accountSid,
  signingKeySid,
  signingKeySecret,
  workspaceSid,
  workerSid
) {
  const taskRouterGrant = new TaskRouterGrant({
    workerSid: workerSid,
    workspaceSid: workspaceSid,
    role: "worker",
  });

  const accessToken = new AccessToken(
    accountSid,
    signingKeySid,
    signingKeySecret,
    { identity:"alice" }
  );
  console.log(accessToken);
  // accessToken.addGrant(taskRouterGrant);
  // accessToken.identity = "alice";

  return accessToken.toJwt();
}

module.exports = {
  connectSocket,
  createAccessToken
}