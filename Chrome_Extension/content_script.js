const code = `
// Step 1: Create the wrapper function
const realCreate = navigator.credentials.create.bind(navigator.credentials);
function myCreateWrapper() {
  alert(JSON.stringify(arguments));
  let res = realCreate.apply(navigator.credentials, arguments);
  res.then(function (value) {
    const utf8Decoder = new TextDecoder("utf-8");

    const decodedClientData = utf8Decoder.decode(value.response.clientDataJSON);
    const clientDataObj = JSON.parse(decodedClientData);
    console.log(clientDataObj);

   const decodedAttestationObject = CBOR.decode(
    value.response.attestationObject);

   const {authData} = decodedAttestationObject;

   // get the length of the credential ID
   const dataView = new DataView(
       new ArrayBuffer(2));
   const idLenBytes = authData.slice(53, 55);
   idLenBytes.forEach(
       (value, index) => dataView.setUint8(
           index, value));
   const credentialIdLength = dataView.getUint16();
   
   // get the credential ID
   const credentialId = authData.slice(
       55, 55 + credentialIdLength);
   
   // get the public key object
   const publicKeyBytes = authData.slice(
       55 + credentialIdLength);
   
   // the publicKeyBytes are encoded again as CBOR
   const publicKeyObject = CBOR.decode(
       publicKeyBytes.buffer);


   const data = {
    id:value.id,
    authenticatorAttachment:value.authenticatorAttachment,
    type:value.type,
    clientData:clientDataObj,
    authData:publicKeyObject
   }
   alert(JSON.stringify(data));
  });
  return res;
};

// Step 2: Bind the wrapper function to navigator.credentials
const myCreate = myCreateWrapper.bind(navigator.credentials);

// Step 3: Overwrite the original function
navigator.credentials.create = myCreate;
`;
const cobr = document.createElement("script");
cobr.src = "https://unpkg.com/cbor-js-unofficial@0.1.0-a4/cbor.js";
document.head.appendChild(cobr);

const script = document.createElement("script");
script.textContent = code;
(document.documentHead || document.documentElement).appendChild(script);
script.remove();




const codeForGet = `
// Step 1: Create the wrapper function
const realGet = navigator.credentials.get.bind(navigator.credentials);
function myGetWrapper() {
  alert(JSON.stringify(arguments));
  console.log(arguments)
  let res = realGet.apply(navigator.credentials, arguments);
  res.then(function (value) {
    const utf8Decoder = new TextDecoder("utf-8");

    const decodedClientData = utf8Decoder.decode(value.response.clientDataJSON);
    const clientDataObj = JSON.parse(decodedClientData);

   

   const data = {
    id:value.id,
    type:value.type,
    clientData:clientDataObj,
   }
   alert(JSON.stringify(data));
  });
  return res;
};

// Step 2: Bind the wrapper function to navigator.credentials
const myGet = myGetWrapper.bind(navigator.credentials);

// Step 3: Overwrite the original function
navigator.credentials.get = myGet;
`;


const getScript = document.createElement("script");
getScript.textContent = codeForGet;
(document.documentHead || document.documentElement).appendChild(getScript);
getScript.remove();
