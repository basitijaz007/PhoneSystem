

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
export const initiateWorker = (status) => {
  const token = status.data.token
  const identity = status.data.identity
  let reservationObject;
  console.log(token);
  console.log('Worker Ready',identity);
   // Initialize the TaskRouter Worker
  const worker = new Twilio.TaskRouter.Worker(token);
  console.log(worker);

  worker.on('reservation.created', function(reservation) {
    reservationObject = reservation;
    // if (reservation.task.attributes.selected_language === 'English') {
        // You can choose to accept or reject the task here
        console.log(reservation);
        if (confirm('Incoming call. Accept?')) {
            reservation.accept();
        } else {
            reservation.reject();
        }
    // }
  });
  worker.on('reservation.accepted', function(reservation) {
      reservationObject = reservation;
      // if (reservation.task.attributes.selected_language === 'English') {
          // You can choose to accept or reject the task here
          console.log(reservation);
          reservation = reservation;

      // }
  });

  worker.on('reservation.completed', function(reservation) {
      reservationObject = reservation;
      // if (reservation.task.attributes.selected_language === 'English') {
          // You can choose to accept or reject the task here
          console.log(reservation);
      // }
  });

  // Event listener for changes in worker's activity
  worker.on('activity.update', function(worker) {
      console.log(worker);

  });
  worker.on('task.updated', function(task) {
      console.log(task);
      if (task.assignmentStatus === 'wrapping') {
          task.complete();
      }
      if (task.assignmentStatus === 'canceled' && task.reason == 'hangup') {
          task.complete();
      }
  });
  worker.on('task.completed', function(worker) {
      console.log(worker);
  });
  worker.on('task.canceled', function(worker) {
      console.log(worker);
  });
}
export const setupDevice = (status) => {
  const Device =  Twilio.Device.setup(status.data.token);
  const identity = status.data.identity
  console.log(Device);
  // console.log(reservation);
  Device.on('ready',function(){
      console.log('ready')
      // $('#accept').show();
      // $('#reject').show();

      // $.ajax({
      //     url: "{{url('ivr/assignTask')}}",
      //     method: "POST",
      //     data:{agent:identity,task:reservation.taskSid},
      //     headers: {
      //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      //     },
      //     success: function(status){

      //     }
      // });
  })


  Device.on('incoming', (connection) => {
      // $('#accept').show();
      console.log(connection);
      // $('#accept').on('click',function(){
      //     connection.accept();
      //     $('#reject').show();
      // })
      if (confirm('Incoming call. Accept?')) {
        connection.accept();
      } else {
        connection.reject();
      }
      // Handle incoming call
  });
  Device.on('connect', (connection) => {
      console.log(connection);
      // $('#reject').on('click',function(){
      //     connection.disconnect();
      //     $('#reject').hide();
      //     $('#accept').hide();
      // })
  });
  Device.on('incomingConnection', (connection) => {
      // Handle the incoming call
      console.log(`Incoming call from: ${connection.from}`);
      // You can answer, reject, or perform other actions here
  });
  Device.on('error', (error) => {
      console.log("Device on error:", error);
  });
}
// module.exports = {
//   connectSocket,
//   createAccessToken,
//   initiateWorker
// }