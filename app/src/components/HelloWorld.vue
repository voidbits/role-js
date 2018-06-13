<template>
  <div>
    <input v-model="credentials.username" type="text" placeHolder="User Name"/>
    <input v-model="credentials.password" type="password" placeHolder="Password"/>
    <input v-model="grantAdmin" type="checkbox">Grant Admin Role</input>
    <button v-on:click="signUp()">Sign Up</button>
    <hr>
    <input v-model="credentials.username" type="text" placeHolder="User Name"/>
    <input v-model="credentials.password" type="password" placeHolder="Password"/>
    <button v-on:click="signIn()">Authenticate</button>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
    <div v-if="loggedIn">
      <ul v-if="users && users.length">
        <li v-for="user of users" v-bind:key="user._id">
          <button v-on:click="remove(user)">Remove {{user.username}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import HelloWorldCard from './HelloWorldCard.vue'
  import AuthenticationServiceClient from '../services/AuthenticationServiceClient'
  import UserServiceClient from '../services/UserServiceClient'
  import Utility from '../services/Utility'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        grantAdmin: false,
        credentials: {
          username: '',
          password: '',
          role: ''
        },
        message: '',
        errors: [],
        users: []
      }
    },
    components: {
      'helloworld-card': HelloWorldCard
    },
    methods: {
      signUp() {

        this.credentials.role = 'user'

        if (this.grantAdmin) {
          this.credentials.role = 'admin'
        }

        AuthenticationServiceClient.signup(this.credentials)
          .then(res => {
            if (res.data.success) {
              this.message = 'Successfully created your account!'
            } else {
              this.message = 'Failed to signup!'
            }
          }).catch(err => {
            this.errors.push(err)
          })
      },
      signIn() {
        this.users = []
        this.message = ''
        this.errors = []
        AuthenticationServiceClient.authenticate(this.credentials)
          .then(res => {
            if (res.data.success) {
              this.$cookie.set('token', res.data.token, '1D')
              this.$cookie.set('user_id', res.data.user._id, '1D')
              this.$cookie.set('username', res.data.user.username, '1D')
              this.$cookie.set('role', res.data.user.role, '1D')
              this.listUsers()
            }
          })
          .catch(err => {
            this.errors.push(err)
          })
      },
      listUsers() {
        UserServiceClient.get(this)
          .then(res => {
            this.users = Utility.dataParser(res.data, '_id', 'username', 'role')
          }).catch(err => {
            this.errors.push(err)
          })
      },
      remove(user) {
        UserServiceClient.remove(this, user)
          .then(res => {
            this.message = res.data.message;
            var index = this.users.indexOf(user)
            this.users.splice(index, 1)
          })
      },
      loggedIn() {
        return AuthenticationServiceClient.checkAuthentication()
      }
    }
  }
  </script>

<style>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>