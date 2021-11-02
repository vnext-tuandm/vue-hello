<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit">
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        handleSubmit(e){
            e.preventDefault()
            console.log("this is login")
            localStorage.setItem('user', JSON.stringify({is_admin : 1}))
            localStorage.setItem('jwt', "this is jwt")
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl)
            }
            else {
                this.$router.push('admin')
            }
        }
    }
}
</script>
<style lang="">
    
</style>