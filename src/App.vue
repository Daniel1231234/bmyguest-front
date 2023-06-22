
<template>
  <main class="main-app">
    <app-header :stays="stays" :appPage="appPage" />
    <div>
      <router-view />
    </div>
    <user-msg />
  </main>
</template>


<script>
import userMsg from './cmps/user-msg.cmp.vue';
import appFooter from './cmps/app-footer.cmp.vue'
import appHeader from './cmps/home/app-header.cmp.vue'

import debounce from 'lodash/debounce';


export default {
  data() {
    return {
    }
  },
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadStays' })
    this.$store.dispatch({ type: 'loadOrders' })
  },
  mounted() { },
  methods: {
  },
  computed: {
    stays() {
      return this.$store.getters.stays
    },
    appPage() {
      return this.$store.getters.currPage
    }
  },
  components: {
    appFooter,
    appHeader,
    userMsg,
  },
}
</script>


