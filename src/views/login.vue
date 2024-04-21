<template>
  <div :class="s.wrapper">
      <p :class="s.title">
        Welcome
      </p>
      <div :class="s.inputDV">
        <van-field v-model="name" label="UserName" :class="s.input"/>
        <van-field type="password" v-model="password" :class="s.input" label="Password" style="margin-top: 18px;"/>
      </div>
      <p :class="s.hint">Forgot Password?</p>
      <van-button type="primary" block :class="s.btn" @click="login" color="#787785" round="true">Login</van-button>
  </div>
</template>
<script>
import { ref, toRefs, reactive, defineComponent, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from 'vue-router'


export default defineComponent({
    setup() {
        const data = reactive({
          name: 'wzx',
          password: 'wzx123',
      })
      const router = useRouter()
      const create = () => {
        axios
        .post("http://127.0.0.1:5000/api/create_user", {
          password: 'wzx123', name: 'wzx'
        })
        .then((response) => {
          // data.employees = response.data;
          callback(response.data);
        })
        .catch((error) => {
          console.error("Error fetching organization structure:", error);
        });
      }

      const login = () => {
          axios
        .post("http://127.0.0.1:5000/api/login", {
          password: data.password , name: data.name
        })
        .then((response) => {
            router.push({ name: 'user' })
        })
        .catch((error) => {
          console.error("Error fetching organization structure:", error);
        });
      }
      onMounted(() => {
        // create()
      })
      return {
        ...toRefs(data),
        login
      }
    }
})
</script>
<style scoped module='s'>
.wrapper {

}
.title {
  text-align: center;
  margin-top: 118px;
  font-weight: bold;
  font-size: 32px;
}
.inputDV {
  margin: 0 auto;
  margin-top: 32px;
}
.input {
  height: 60px;
  font-size: 1rem;
}

.hint {
  text-align: center;
  color: #ccc;
  margin-top: 20px;
}

.btn {
  margin-top: 24px;
  height: 50px;
}
</style>
