'use strict'

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// var url = 'http://localhost:9991/api/test123'; 
// var xhr = new XMLHttpRequest;
// xhr.open("GET", url, true);
// xhr.send(function() {
//   console.log(xhr)
// });
// xhr.onerror = function(error) {
//   console.log('xhr.onerror')
//   console.log(xhr)
// }
// xhr.onload = function(){
//   console.log('xhr.onload')
//   console.log('11111')
//   console.log(xhr.status)
//   console.log('22222')
// }
// xhr.onloadend = function() {
//   console.log('xhr.onloadend')
//   console.log('33333')
//   console.log(xhr.status)
//   console.log('444444')

// }
// // xhr.addEventListener("load", resolve);
// xhr.onreadystatechange = function () {
//   console.log('xhr.onreadystatechange')
//     if(xhr.readyState === xhr.DONE && xhr.status === 200) {
//         // console.log(xhr.responseText);
//     }
//     // console.log(xhr)
// };
// xhr.upload = function(data) {
//   console.log('xhr.upload')
//   console.log(data)
// }
/*
{ 
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4,
  readyState: 2,
  onreadystatechange: [Function],
  responseText: '',
  responseXML: '',
  status: 0,
  statusText: null,
  withCredentials: false,
  open: [Function],
  setDisableHeaderCheck: [Function],
  setRequestHeader: [Function],
  getResponseHeader: [Function],
  getAllResponseHeaders: [Function],
  getRequestHeader: [Function],
  send: [Function],
  handleError: [Function],
  abort: [Function],
  addEventListener: [Function],
  removeEventListener: [Function],
  dispatchEvent: [Function] 
}
*/

function ajaxGetAsync(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, true);
    xhr.send(null);
    xhr.onerror = function() {
      return reject(xhr.responseText)
    }
    xhr.onload = function() {
      if (xhr.status == 200) {
        return resolve(xhr.responseText)
      } else {
        return reject('访问失败')
      }
    }
  });
}

ajaxGetAsync('http://localhost:9999/api/test?i=1')
  .then((data) => {
    return ajaxGetAsync('http://localhost:9999/api/test12?i=2')
  }).then((data) => {
    console.log(data)
  }).catch((error) => {
    console.log(error)
  })
