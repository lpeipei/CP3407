<script>
import { toRefs, reactive, defineComponent, onMounted } from "vue";
import { useRouter , useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
        activeIndex: 4,
        routerList: [
          { icon: 'wap-home-o',  linkName: 'schedule' },
          { icon: 'clock-o', linkName: 'focusTime' },
          { icon: 'goods-collect-o', linkName: 'dailyRecord' },
          { icon: 'notes-o', linkName: 'timetable' },
          { icon: 'contact-o', linkName: 'user' },
        ]
    })
    const goPage = (item, index) => {
        data.activeIndex = index
        router.push({ name: item.linkName })
    }
    const onChange = (index) => {
        router.push({ name: data.routerList[index].linkName })
    }
    onMounted(() => {
        console.log(route, 'xx')
    })

    return {
      ...toRefs(data),
      route,
      goPage,
      onChange
    }
  }
})
</script>

<template>
  <div>
    <RouterView />
    <van-tabbar v-model="activeIndex" @change="onChange" v-if="route.name !== 'login'">
      <van-tabbar-item :icon="item.icon" v-for="item in routerList"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
