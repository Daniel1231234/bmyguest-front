<template>
  <section class="open-header clickable">
    <div class="relative">
      <form @submit.prevent class="main-form">
        <div class="search-input-container" @click="whereClick" :class="{ active: !searchClick }">
          <label>
            Where
            <input type="text" v-model="dest" class="stay-search clickable" placeholder="Start your search" />
          </label>
        </div>

        <date-picker @dates="updatedDates" />

        <div @click.stop="guestsClick" :class="{ active: !active }" class="guests-container mini-container">
          <label class="clickable">Who
            <input class="guests" placeholder="Add guests" disabled />
          </label>
          <button @click.stop="goExplore" class="btn-airbnb search-header-btn">
            Search
          </button>
        </div>

        <div class="guests-modal" v-if="shouldShow">
          <div class="guest-type-label">
            <div class="guest-label">
              <span><strong>Adults</strong> </span>
              <small>Ages 13 or above</small>
            </div>
            <div class="guest-btns">
              <button type="button">
                <span @click="inc(-1)"> - </span>
              </button>
              <span class="guests-num">{{ adults }}</span>
              <button type="button">
                <span @click="inc(+1)"> + </span>
              </button>
            </div>
          </div>

          <div class="guest-type-label">
            <div class="guest-label">
              <span><strong>Children</strong> </span>
              <small>Ages 2-12</small>
            </div>
            <div class="guest-btns">
              <button type="button">
                <span @click="incChildrens(-1)"> -</span>
              </button>
              <span class="guests-num">{{ children }}</span>
              <button type="button">
                <span @click="incChildrens(+1)"> + </span>
              </button>
            </div>
          </div>
        </div>

        <header-map v-if="!searchClick" v-model="dest" class="header-country" />
      </form>
    </div>
  </section>
</template>
<script>
import headerMap from "../header-map-search.cmp.vue";
import datePicker from "./date-picker.cmp.vue";
import guestsModal from "../guests-modal.cmp.vue";

import { toRaw } from "vue";
export default {
  data() {
    return {
      dest: "",
      adults: 0,
      children: 0,
      shouldShow: false,
      dates: [],
      active: true,
      count: 0,
      searchClick: false,
    };
  },
  created() { },
  methods: {
    async goExplore() {
      const searchFields = {
        dest: this.dest.trim(),
        dates: toRaw(this.dates),
        guests: this.adults + this.children,
      };
      if (!this.dest) return alert("inValid");
      console.log(searchFields)
      this.dest = ""

      await this.$store.dispatch({type:'loadStays', filterBy:searchFields})
      this.$router.push(`/explore`);
    },
    async setStays(order) {
      try {
        const stays = await this.$store.dispatch({
          type: "loadStays",
          filterBy: order,
        });
        if (stays.length === 60) {
          console.log("no stays dude");
          this.$router.push(`/`);
        } else this.$router.push(`/explore`);
      } catch (err) {
        console.log(err);
      }
    },
    inc(num) {
      this.adults += num;
    },
    incChildrens(num) {
      this.children += num;
    },
    guestsClick() {
      this.shouldShow = !this.shouldShow;
      this.active = !this.active;
      this.searchClick = true;
    },
    async whereClick() {
      try {
        this.count++;
        if (this.count > 1) this.searchClick = !this.searchClick;
        this.shouldShow = false;
      } catch (err) {
        console.log(err);
      }
    },
    updatedDates(data) {
      console.log(data)
      this.dates = data;
    },
  },
  computed: {},
  components: {
    datePicker,
    headerMap,
    guestsModal,
  },
};
</script>
