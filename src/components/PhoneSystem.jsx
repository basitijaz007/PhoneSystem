import React, { useState, useEffect } from "react";
import axios from "axios";
import { Device } from "@twilio/voice-sdk";

const PhoneSystem = () => {
  const [phoneNumber, setPhoneNumber] = useState("");  
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/taskrouter-token");
        return response.data.token;
      } catch (error) {
        console.error("Error fetching token:", error);
        return null;
      }
    };

    const initializeDevice = async () => {
      const token = await fetchToken();
      if (!token) {
        console.error("No token received");
        return;
      }

      try {
        const newDevice = new Device(token, {
          logLevel: 1,
          codecPreferences: ["opus", "pcmu"],
          maxCallSignalingTimeoutMs: 3000,
        });

        newDevice.register();
        console.log("Device initialized:", newDevice);

        newDevice.on("ready", () => {
          console.log("Device is ready");
        });

        newDevice.on("error", (error) => {
          console.error("Twilio Device Error:", error);
        });

        newDevice.on("incoming", (connection) => {
          console.log("Incoming call:", connection);
          connection.accept();
        });

        setDevice(newDevice);
      } catch (error) {
        console.error("Error initializing Twilio Device:", error);
      }
    };

    initializeDevice();
  }, []);

  const params={
    To:phoneNumber,
    agent:'basit',
    callerId:'+13219780391',
    Location:"PAk"
  }
  console.log(params);
  const handleCall = async () => {
    if (device) {
      const call = await device.connect({
        params
      })
      console.log("Calling", phoneNumber);
    } else {
      console.error("Device not initialized");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleCall}>Call</button>
    </div>
  );
};

export default PhoneSystem;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Device } from "@twilio/voice-sdk";
// import './PhoneSystem.css'; // Import your CSS file here

// const PhoneSystem = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [device, setDevice] = useState(null);
//   const [contactInfo, setContactInfo] = useState(null);
//   const [callStatus, setCallStatus] = useState("Dial a number");

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/taskrouter-token");
//         return response.data.token;
//       } catch (error) {
//         console.error("Error fetching token:", error);
//         return null;
//       }
//     };

//     const initializeDevice = async () => {
//       const token = await fetchToken();
//       if (!token) {
//         console.error("No token received");
//         return;
//       }

//       try {
//         const newDevice = new Device(token, {
//           logLevel: 1,
//           codecPreferences: ["opus", "pcmu"],
//           maxCallSignalingTimeoutMs: 3000,
//         });

//         newDevice.register();
//         console.log("Device initialized:", newDevice);

//         newDevice.on("ready", () => {
//           console.log("Device is ready");
//         });

//         newDevice.on("error", (error) => {
//           console.error("Twilio Device Error:", error);
//         });

//         newDevice.on("incoming", (connection) => {
//           console.log("Incoming call:", connection);
//           connection.accept();
//         });

//         setDevice(newDevice);
//       } catch (error) {
//         console.error("Error initializing Twilio Device:", error);
//       }
//     };

//     initializeDevice();
//   }, []);

//   const handleCall = () => {
//     if (device) {
//       const params = { To: phoneNumber };
//       device.connect(params);
//       console.log("Calling", phoneNumber);
//       setCallStatus("Calling...");
//       setTimeout(() => {
//         setCallStatus("In Call");
//       }, 3000);
//     } else {
//       console.error("Device not initialized");
//     }
//   };

//   const addNumber = (number) => {
//     setPhoneNumber((prev) => prev + number);
//     checkNumber(prev => prev + number);
//   };

//   const checkNumber = (newNumber) => {
//     const contacts = [
//       { name: "Matt Sich", number: "1234567890", image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/378978/profile/profile-80_1.jpg", desc: "CodePenner" },
//       { name: "hellogiov", number: "0651985833", image: "http://avatars-cdn.producthunt.com/207787/220", desc: "Publicis Nurun" },
//     ];
    
//     const contact = contacts.find(contact => contact.number.startsWith(newNumber));
//     if (contact) {
//       setContactInfo(contact);
//     } else {
//       setContactInfo(null);
//     }
//   };

//   const removeLastDigit = () => {
//     setPhoneNumber((prev) => prev.slice(0, -1));
//     checkNumber(prev => prev.slice(0, -1));
//   };

//   const handleHangUp = () => {
//     if (device) {
//       device.disconnectAll();
//       setPhoneNumber("");
//       setCallStatus("Dial a number");
//       setContactInfo(null);
//     }
//   };

//   return (
//     <div className="pad">
//       <div className="dial-pad">
//         {contactInfo && (
//           <div className="contact showContact">
//             <div className="avatar" style={{ backgroundImage: `url(${contactInfo.image})` }}></div>
//             <div className="contact-info">
//               <div className="contact-name">{contactInfo.name}</div>
//               <div className="contact-position">{contactInfo.desc}</div>
//               <div className="contact-number">{contactInfo.number}</div>
//             </div>
//           </div>
//         )}
//         <div className="phoneString">
//           <input type="text" value={phoneNumber} disabled />
//         </div>
//         <div className="digits">
//           {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit, index) => (
//             <div className="dig number-dig" key={index} onClick={() => addNumber(digit)}>
//               {digit}
//             </div>
//           ))}
//         </div>
//         <div className="digits">
//           <div className="dig action-dig" onClick={removeLastDigit}>Back</div>
//           <div className="dig action-dig" onClick={handleCall}>Call</div>
//         </div>
//       </div>

//       <div className="call-pad">
//         <div className="ca-name">{callStatus}</div>
//         <div className="ca-buttons">
//           <div className="ca-b-single" onClick={handleHangUp}>Hang Up</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhoneSystem;
