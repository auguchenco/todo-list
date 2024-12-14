// GET CON BEARER TOKEN
let response = await fetch('https://example.com/path', {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + YOUR_TOKEN }
});
let data = await response.json();
console.log(data);