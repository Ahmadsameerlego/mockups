<script>
import MultiSelect from "primevue/multiselect";
// import { ref } from "vue";
// import axios from "axios"
// const selectedCountries = ref();
// Explicitly import the image assets
import denemark from "@/assets/denemark.jpeg";
import suid from "@/assets/suid.jpeg";
import ner from "@/assets/ner.jpeg";
import fen from "@/assets/fen.jpeg";
// import brazilFlag from '@/assets/2.jpeg';
// import chinaFlag from '@/assets/3.jpeg';
// import egyptFlag from '@/assets/4.jpeg';
import axios from "axios";
import Toast from "primevue/toast";

export default {
  data() {
    return {
      countries: [
        {
          id: 1,
          name: "Denmark",
          code: "DK",
          flag: denemark,
        },
        {
          id: 2,
          name: "Sweden",
          code: "SE",
          flag: suid,
        },
        {
          id: 3,
          name: "Norway",
          code: "NO",
          flag: ner,
        },
        {
          id: 4,
          name: "Finland",
          code: "FI",
          flag: fen,
        },
      ],
      selectedContries: [],
      username: "",
      password: "",
      name: "",
      password_confirmation: "",
      email: "",
    };
  },
  methods: {
    async register() {
      const fd = new FormData();
      fd.append("username", this.username);
      fd.append("password", this.password);
      fd.append("email", this.email);
      fd.append("password_confirmation", this.password_confirmation);
      fd.append("name", this.name);
      if (this.selectedContries) {
        for (let i = 0; i < this.selectedContries.length; i++) {
          fd.append("countries[]", this.selectedContries[i].id);
        }
      }
      await axios
        .post("register", fd)
        .then((response) => {
          console.log("Response:", response);
          this.$toast.add({
            severity: "success",
            summary: "Account Created Successfully",
            life: 3000,
          });
          localStorage.setItem('token', response.data.data.token)
          setTimeout(() => {
          
            this.$router.push('/users')
          }, 1000);
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
    MultiSelect,
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
      <h1>Add User</h1>
      <p>Please fill in this form to create an account.</p>

      <label for="email"><b>Name</b></label>
      <input
        type="text"
        name="Name"
        v-model="name"
        placeholder="Enter Name"
        required
      />

      <label for="email"><b>Username</b></label>
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="Enter Username"
        required
      />

      <label for="email"><b>Email</b></label>
      <input
        type="email"
        name="Email"
        v-model="email"
        placeholder="Enter Email"
        required
      />

      <div class="mb-3">
        <label for="email" class="mb-2"><b>Country</b></label>
        <div>
          <MultiSelect
            v-model="selectedContries"
            :options="countries"
            optionLabel="name"
            placeholder="Select Countries"
            display="chip"
            class="w-full md:w-80"
          >
            <template #option="slotProps">
              <div class="d-flex align-items-center justify-content-center">
                <img
                  :alt="slotProps.option.name"
                  :src="slotProps.option.flag"
                  :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
                  class="mx-3"
                  style="width: 18px"
                />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
            <template #footer>
              <div class="py-2 px-4">
                <b>{{ selectedCountries ? selectedCountries.length : 0 }}</b>
                item{{
                  (selectedCountries ? selectedCountries.length : 0) > 1
                    ? "s"
                    : ""
                }}
                selected.
              </div>
            </template>
          </MultiSelect>
        </div>
      </div>

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        v-model="password"
        placeholder="Enter Password"
        name="psw"
        required
      />
      <label for="psw"><b>Rewtire Password</b></label>
      <input
        type="password"
        v-model="password_confirmation"
        placeholder="Enter Password"
        name="psw"
        required
      />

      <div class="clearfix">
        <button type="submit" class="btn" @click.prevent="register">
          Sign Up
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

