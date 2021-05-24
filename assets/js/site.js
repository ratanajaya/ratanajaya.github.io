(function () {
  const urlApi = 'https://localhost:44365/';

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