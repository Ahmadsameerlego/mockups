

<script>
import axios from "axios";
import Toast from "primevue/toast";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const fd = new FormData();
      fd.append("username", this.username);
      fd.append("password", this.password);
      await axios
        .post("login", fd)
        .then((response) => {
          console.log("Response:", response);
          this.$toast.add({
            severity: "success",
            summary: "Signned In Successfully",
            life: 3000,
          });
          localStorage.setItem('user', JSON.stringify(response.data.data))
          localStorage.setItem('token', response.data.data.token)
          setTimeout(() => {
            if(response.data.data.admin == "1"){
              this.$router.push('/users')
            }else{
              this.$router.push('/choose')
            }
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          this.$toast.add({
            severity: "error",
            summary: error.response.data.message,
            life: 3000,
          });
        });
    },
  },
  components: {
    Toast,
  },
};

// const countries = ref([
//   { name: "Australia", code: "AU", flag: australiaFlag },
//   { name: "Brazil", code: "BR", flag: brazilFlag },
//   { name: "China", code: "CN", flag: chinaFlag },
//   { name: "Egypt", code: "EG", flag: egyptFlag },
// ]);
</script>

<template>
  <form>
    <div class="container">
      <h1>Sign In</h1>
      <p>Please fill in this form to Login.</p>

      <label for="email"><b>Username</b></label>
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="Enter Username"
        required
      />

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        v-model="password"
        placeholder="Enter Password"
        name="psw"
        required
      />

      <div class="clearfix">
        <button type="submit" class="btn" @click.prevent="register">
          Sign In
        </button>
      </div>
    </div>
  </form>

  <Toast />
</template>



<style>
.p-multiselect {
  width: 100%;
  background: #f7f7f7;
  border: none;
}
</style>
<style scoped>
.container {
  padding: 20px;
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  -webkit-box-shadow: 2px 1px 21px -9px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 2px 1px 21px -9px rgba(0, 0, 0, 0.38);
  box-shadow: 2px 1px 21px -9px rgba(0, 0, 0, 0.38);
}

/* Full-width input fields */
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
  background: #f7f7f7;
  font-family: Montserrat, Arial, Helvetica, sans-serif;
}
select {
  width: 18%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f7f7f7;
  font-family: Montserrat, Arial, Helvetica, sans-serif;
}

input[type="phone"] {
  width: 81%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f7f7f7;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="phone"]:focus,
select:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for all buttons */
button {
  background-color: #0eb7f4;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  font-size: 16px;
  font-family: Montserrat, Arial, Helvetica, sans-serif;
  border-radius: 10px;
}

button:hover {
  opacity: 1;
}

/* Change styles for signup button on extra small screens */
@media screen and (max-width: 300px) {
  .signupbtn {
    width: 100%;
  }
}
</style>
