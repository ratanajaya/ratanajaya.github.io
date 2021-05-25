// var elem = document.querySelector('.main-carousel');
// var flkty = new Flickity(elem, {
//   // options
//   cellAlign: 'left',
//   contain: true
// });

//const urlApi = 'https://localhost:44365/';
const urlApi = 'http://wkrapi.azurewebsites.net/';

(function () {

  document.getElementById("btnSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    const messageModel = {
      senderName: document.getElementById('senderName').value,
      content: document.getElementById('message').value,
      recaptchaToken: recaptchaToken
    };

    console.log('messageModel', messageModel);

    fetch(urlApi + 'Portfolio/SendMessage', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageModel)
    }).then(res => {
      if (res.status === 200) {
        swal("Success!", "Message Sent!", "success");
      }
      else if (res.status === 401) {
        swal("error", "ReCaptcha verivication failed or expired", "error");
      }
      else {
        swal("error", res.status.toString(), "error");
        console.log('error', res);
      }
    })
      .catch(function (err) {
        swal("Fetch Error", JSON.stringify(err), "error");
        console.log('Fetch Error', err);
      });
  });

})();

var recaptchaToken = null;

function recaptchaCallback(val) {
  //console.log('recaptchaCallback', val);
  recaptchaToken = val;
}

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

var diagUrl = "https://ipgeolocation.abstractapi.com/v1/?api_key=7a08b9680efb4d0eb1a62d267e8e0a19"

httpGetAsync(diagUrl, (res) => {
  var diagResult = JSON.parse(res);
  //console.log('diag result', diagResult);

  fetch(urlApi + 'Portfolio/Diagnosis', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(diagResult)
  }).then(res => {
    if (res.status === 200) {
      console.log('post diag success');
    }
    else {
      console.log('post diag error response', res.status);
    }
  })
    .catch(function (err) {
      console.log('post diag fetch error', err);
    });
});