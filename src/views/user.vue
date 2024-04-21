<template>
  <div :class="s.wrapper">
      <div :class="s.header">
            <div :class="s.headerImg"></div>
            <div :class="s.headerDetail">
                <p :class="s.nickname">Estelle</p>
                <p style="font-size: 8px;">Stick with the plan for 8 days...</p>
            </div>
            <div :class="s.headerStatus">
                <van-icon name="sign" />
                <span style="margin-left: 4px;">SIGN IN</span>
            </div>
      </div>
      <div :class="s.cellContainer">
        <van-cell icon="contact-o" :border="false" :class="s.cell" title="Change account info" is-link />
        <van-cell :class="s.cell" :border="false" icon="shield-o" title="Security" is-link />
        <van-cell icon="revoke" :border="false" :class="s.cell" title="Log out" @click="logOut" is-link />
      </div>
  </div>
</template>
<script>
import { ref, toRefs, reactive, defineComponent, onMounted } from "vue";
import { useRouter , useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const route = useRoute()
        const data = reactive({
      })
      const logOut = () => {
        router.push({ name: 'login' })
      }
      return {
        ...toRefs(data),
        logOut
      }
    }
})
</script>
<style scoped module='s'>
.wrapper {
    
}
.header {
    display: flex;
    align-items: center;
}
.headerImg {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #ccc;
    margin-right: 12px;
}

.headerDetail {
    color: #787785;
    flex: 1;
}
.nickname {
    font-size: 20px;
}

.headerStatus {
    width: 80px;
    height: 26px;
    border-radius: 10px;
    border: 1px solid #787785;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F6F2F1;
    color: #787785;
    
}
.cellContainer {
    margin-top: 45px;
}
.cell {
    height: 50px;
    /* font-size: 16px; */
}
</style>
