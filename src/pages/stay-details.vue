<template>
  <section>
    <template v-if="isLoading">
      <loader />
    </template>
    <template v-else-if="stay">
      <div class="details-page" :class="{ overlay: isOverlay }">
        <deatils-sticky-header :priceSummary="priceSummary" v-if="windowTop > 660" />
        <div id="photos" class="stay-details main-layout">
          <details-header :stay="stay" />
          <img-gallery :images="stay.imgUrls" />
          <div class="description-layout flex">
            <details-description :stay="stay" />
            <reservation-details :stay="stay" />
          </div>
          <details-reviews :stay="stay" />
        </div>
        <app-footer />
      </div>
      <div class="details-page-mobile-container">
        <stay-details-mobile :stay="stay" />
      </div>
    </template>
    <template v-else>
      <notFound />
    </template>
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
import notFound from "../cmps/notFound.vue";
import loader from "../cmps/loader.cmp.vue";
import { toRaw } from "vue";

export default {
  name: "details-page",
  data() {
    return {
      isLoading: true,
      stay: null,
      images: null,
      windowTop: null,
      priceSummary: {
        price: 0,
        reviewsLength: 0,
        rating: 0,
      },
    };
  },
  async created() {
    try {
      window.addEventListener("scroll", this.onScroll);
      this.onScroll();
      const { stayId } = this.$route.params;
      await this.$store.dispatch({ type: "loadById", id: stayId });

      const loadedStay = toRaw(this.$store.getters.getCurrStay);
      if (!loadedStay) {
        this.isLoading = false;
        return;
      }
      this.stay = loadedStay;
      this.isLoading = false;

      const priceSummaryLoaded = {
        price: loadedStay.price ?? 100,
        reviewsLength: loadedStay.reviews.length ?? 5,
        rating: loadedStay.reviewScores.rating ?? 100,
      };

      this.priceSummary = priceSummaryLoaded;

      this.$store.commit({ type: "setCurrPage", page: "details-page" })
    } catch (err) {
      console.log("Error in stay details", err);
      throw err;
    }
  },
  methods: {
    onScroll(e) {
      this.windowTop = window.top.scrollY;
    },
  },
  computed: {
    isOverlay() {
      return this.$store.getters.isOverlay
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
    notFound,
    loader,
  },
};
</script>
