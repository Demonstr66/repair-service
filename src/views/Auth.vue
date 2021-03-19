<template>
  <div class="row center">
    <form class="login-form z-depth-3">
      <div class="input-field">
        <i class="material-icons prefix">phone</i>
        <label for="user_phone">Телефон</label>
        <masked-input
          id="user_phone"
          type="tel"
          name="phone"
          class="form-control validate"
          v-model="phone"
          :mask="[/[7-8]/,'(', /[8-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
          :guide="true"
          placeholderChar="_" />
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action" @click.prevent="sendSms">Получить код
        <i class="material-icons right">send</i>
      </button>
    </form>
    <form class="login-form z-depth-3">
      <div class="input-field">
        <masked-input
          id="user_code"
          type="text"
          name="code"
          v-model="code"
          class="form-control validate"
          :mask="[/\d/,' ',/\d/,' ',/\d/,' ',/\d/,' ',/\d/,' ',/\d/]"
          :guide="true"
          placeholderChar="_" />
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action" @click.prevent="enterCode">Ввести код
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask'
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFzkuVWRA-vwvi9qtaxNoA0_xye6aosps",
  authDomain: "repaire-service.firebaseapp.com",
  databaseURL: "https://repaire-service-default-rtdb.firebaseio.com",
  projectId: "repaire-service",
  storageBucket: "repaire-service.appspot.com",
  messagingSenderId: "850712119557",
  appId: "1:850712119557:web:30738f4ad3f6b8d732cf6c",
  measurementId: "G-H0T1NJ4MF1"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = "ru";

export default {
  components: {
    MaskedInput
  },
  mounted() {
    const btn = document.getElementById("user_phone")
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier( btn, {
      'size': 'invisible',
      'callback': () => {
        this.sendSms();
      }
    });
  },
  data() {
    return {
      rawPhoneNumber: "",
      phone: "",
      code: "",
    }
  },
  methods: {
    getPhoneNumberFromUserInput() {
      let phone = this.phone
      phone = phone.replaceAll(/[ ()-]/g, "")
        .replace(/[78]/, "+7")

      return phone
    },
    sendSms() {
      const phoneNumber = this.getPhoneNumberFromUserInput();
      console.log(phoneNumber)
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          }).catch((err) => {
            console.log("SendError:", err)
          });
    },
    enterCode() {
      const code = this.code.replaceAll(" ", "")
      console.log("Code:", code)
      
      window.confirmationResult.confirm(code).then((result) => {
        
        const user = result.user;

        console.log("User:", user)
      }).catch((error) => {
        console.log("CodeError:", error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
.login-form {
  width: 400px;
  margin: auto;
  margin-top: 150px;
  padding: 15px;
}
</style>