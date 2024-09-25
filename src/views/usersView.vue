<template>
  <section class="head">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
        </div>

        <div class="d-flex">
          <div>
            <button class="btn btn-primary">
                <router-link to="/addUser" style="color:inherit;text-decoration: none">
                    Add User
                </router-link>
            </button>
          </div>
          <div class="mx-4">
            <button class="btn btn-danger" @click.prevent="logout">Log Out</button>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <h1 class="text-center mb-4">Users</h1>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Countries</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <th scope="row"> {{ index+1 }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span v-for="con in user.countries" :key="con.id"> {{ con.name }} , </span>
              </td>

              <td>
                <router-link class="edit-icon" :to="'/user/'+user.id">
                    <img src="@/assets/edit.svg" alt="">
                </router-link>
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <Toast />
</template>
<script>
import Toast from "primevue/toast";

import axios from 'axios';
export default {
    data(){
        return{
            users : []
        }
    },
    methods:{
        async getUsers(){
            await axios.get('users', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.users = res.data.data ;
                console.log(this.users)

            } )
        },

        async logout(){
            const fd = new FormData()
            await axios.post('logout', fd ,{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
          console.log("Response:", response);
          this.$toast.add({
            severity: "success",
            summary: "Signned In Successfully",
            life: 3000,
          });
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          setTimeout(() => {
              this.$router.push('/')
            
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
        }
    },
    components:{
        Toast
    },  
    mounted(){
        this.getUsers()
    }
};
</script>


<style>
.edit-icon img{
    width:20px;
    height:20px;
    object-fit: contain
}
.head {
  padding: 15px;
  width: 100vw;
}
.logo img {
  width: 120px;
  height: 110px;
  object-fit: contain;
}
</style>
  
