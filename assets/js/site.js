(function () {
  document.getElementById("btnSubmit").addEventListener("click", () => {
    var grecaptcha = document.getElementById('captcha');

    var response = grecaptcha.getResponse();
    console.log('response', response);

    const messageModel = {
      senderName: document.getElementById('senderName').value,
      content: document.getElementById('message').value,
      recaptchaToken: ""
    };

    console.log('messageModel', messageModel);
  });

})()