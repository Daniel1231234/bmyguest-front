<template>
  <section v-if="stay">
    <div class="details-page">
      <div id="photos" class="stay-details main-layout">
        <!-- <deatils-sticky-header @scrollTo="scrollTo" :bottom="bottom" :priceSummary="priceSummary"
            v-if="windowTop > 660" /> -->
        <deatils-sticky-header :priceSummary="priceSummary" v-if="windowTop > 660" />
        <details-header :stay="stay" />
        <img-gallery :images="stay.imgUrls" />
        <div class="description-layout flex">
          <details-description :stay="stay" />
          <reservation-details :stay="stay" />
        </div>
        <details-reviews :stay="stay" />
        <div class="map-container">
          <details-map class="details-map" :stay="stay" />
        </div>
      </div>
      <app-footer />
    </div>
    <div class="details-page-mobile-container">
      <stay-details-mobile :stay="stay" />
    </div>
  </section>
</template>
<script>
import detailsMap from "../cmps/details-map.cmp.vue";
import imgGallery from "../cmps/details/image-gallery.cmp.vue";
import detailsHeader from "../cmps/details/details-header.cmp.vue";
import reservationDetails from "../cmps/details/reservation-details.cmp.vue";
import detailsDescription from "../cmps/details/details-description.cmp.vue";
import deatilsStickyHeader from "../cmps/details/deatils-sticky-header.cmp.vue";
import detailsReviews from "../cmps/details/details-reviews.cmp.vue";
import appFooter from "../cmps/app-footer.cmp.vue";
import stayDetailsMobile from "../cmps/details/stay-details-mobile.cmp.vue";

import { ElLoading } from "element-plus";

export default {
  data() {
    return {
      stay: null,
      images: null,
      windowTop: null,
      priceSummary: {
        price: 0,
        reviewsLength: 0,
        rating: 0,
      },
      // bottom: null,
      isLoading: false,
      // isMobile: false,
    };
  },
  async created() {
    window.addEventListener("scroll", this.onScroll);
    this.onScroll();
    const { stayId } = this.$route.params;
    this.startLoader();
    try {
      await this.$store.dispatch({ type: "loadById", id: stayId });
      this.closeLoader();

      if (!stayId) return this.$router.push("/stay");
      this.stay = this.$store.getters.getCurrStay;
      this.priceSummary.price = this.stay.price;
      this.priceSummary.reviewsLength = this.stay.reviews.length;
      this.priceSummary.rating = this.stay.reviewScores.rating;

      this.$store.commit({ type: "setCurrPage", page: "details-page" });
    } catch (err) {
      console.log("Error in getById stays (store)", err);
      throw err;
    }
  },
  methods: {
    onScroll(e) {
      this.windowTop = window.top.scrollY;
    },
    // scrollTo(refName) {
    //   var element = this.$refs[refName];
    //   var top = element.offsetTop;
    //   console.log(element, top)
    //   window.scrollTo(0, top);
    // },
    loader() {
      const loader = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.isLoading) return loader;
      else loader.close();
    },
    closeLoader() {
      this.isLoading = false;
      this.loader();
    },
    startLoader() {
      this.isLoading = true;
      this.loader();
    },
  },
  // mounted() {
  //   this.onScroll
  // },
  computed: {
    detailsPage() {
      return this.$store.getters.currPage === "details-page" ? true : false;
    },
  },
  unmounted() {
    window.removeEventListener("scroll", this.onScroll);
  },
  components: {
    imgGallery,
    detailsHeader,
    reservationDetails,
    detailsDescription,
    deatilsStickyHeader,
    detailsReviews,
    appFooter,
    detailsMap,
    stayDetailsMobile,
  },
};
</script>
