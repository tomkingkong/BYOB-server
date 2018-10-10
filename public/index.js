// function grabVineyardData() {
//   fetch('https://private-anon-75be9df9c6-globalwinescore.apiary-proxy.com/globalwinescores/latest/')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error))
// }
var request = require('request');

request({
  method: 'GET',
  url: 'https://api.globalwinescore.com/globalwinescores/latest/',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Token <YOUR-API-TOKEN>'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});