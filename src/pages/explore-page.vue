<template>
  <section class="explore-app" v-if="stays">
    <main-filter :stays="stays" />
    <stay-list @addToWishList="addToWishList" v-if="stays" :stays="stays" />
    <div v-else="loader()"></div>
  </section>
</template>

<script>
import stayList from '../cmps/home/stay-list.cmp.vue'
import mainFilter from '../cmps/filter.cmp.vue'
import { ElLoading } from 'element-plus'

export default {
  name: 'explore-page',
  created() {
    this.$store.commit('setCurrPage', { page: 'explore-app' })
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async addToWishList(stay) {
      // this.isLoading = true
      // this.loader()
      try {
        let newStay = { ...stay }
        // let newStay = structuredClone(stay)
        newStay.wished = !newStay.wished
        this.$store.dispatch({ type: 'saveStay', stay: newStay })
        await this.$store.dispatch({ type: 'loadStays' })
        // this.isLoading = false
        // this.loader()
      } catch (err) {
        console.log(err)
      }
    },
    loader() {
      const loader = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (this.isLoading) return loader
      else loader.close()
    },
  },
  computed: {
    stays() {
      return this.$store.getters.stays
    },
    isHeaderOpen() {
      return this.$store.getters.openHeader
    }
  },
  components: {
    stayList,
    mainFilter
  },
  // watch: {
  //   isLoading1() {
  //     if (this.isLoading) {
  //       this.loader()
  //     }
  //   }
  // }
}
</script>