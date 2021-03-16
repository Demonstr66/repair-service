const firebaseConfig = {
  apiKey: "AIzaSyDFzkuVWRA-vwvi9qtaxNoA0_xye6aosps",
  authDomain: "repaire-service.firebaseapp.com",
  projectId: "repaire-service",
  storageBucket: "repaire-service.appspot.com",
  messagingSenderId: "850712119557",
  appId: "1:850712119557:web:30738f4ad3f6b8d732cf6c",
  measurementId: "G-H0T1NJ4MF1"
};

firebase.initializeApp(firebaseConfig)

firebase.auth.languageCode = 'ru';
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(document.getElementById('signin'), {
  'size': 'invisible',
  'callback': (response) => {
    onSignInSubmit();
  }
});

function getPhoneNumberFromUserInput() {
  return document.getElementById('phone').value
}



function sendSMS() {
  const phoneNumber = getPhoneNumberFromUserInput();
  const appVerifier = window.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
}

console.log("new version")