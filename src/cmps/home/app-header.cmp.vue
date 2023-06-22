<template>
    <section class="app-header">
        <section class="top-header main-layout">
            <div class="logo">
                <h1 @click.stop="this.$router.push('/')">
                    <span>
                        <i class="fa-brands fa-airbnb logo-icon"></i>
                    </span>
                    <span class="logo-txt"> BmyGuest </span>
                </h1>
            </div>
            <div @click="openSearchBar" class="search-close">
                <div v-if="!isOpenHeader" class="mini-search clickable">
                    <label>Anywhere</label>
                    <label>Any week</label>
                    <label>Add guests</label>
                    <span></span>
                </div>
            </div>
            <header-nav :stays="stays" />
        </section>
        <open-header v-if="isOpenHeader" />
    </section>


    <template v-if="isMobile">
        <header-mobile :stays="stays" @setIsMobile="openMobSearchBar" :isMobile="isMobile" />
    </template>
    <template v-else>
        <section class="mobile-open-header">
            <open-header-mobile :isMobile="isMobile" @isMobile="closeOpenHdrMobile" />
        </section>
    </template>
</template>


<script>
import datePicker from "./date-picker.cmp.vue";
import headerNav from "./header-nav.cmp.vue";
import openHeader from "./open-header.cmp.vue";
import openHeaderMobile from "./open-header-mobile.cmp.vue";
import headerFilter from "./header-filter.cmp.vue";
import headerMobile from "../mobile/header-mobile.vue";

export default {
    name: "app-header",
    props: {
        stays: {
            type: Array,
        },
        appPage: {
            type: String
        }
    },
    data() {
        return {
            pageTop: 0,
            dates: [],
            isMobile: true,
            openFilterMb: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        openMobSearchBar(val) {
            this.isMobile = val;
            window.scrollTo(0, 0);
        },
        closeOpenHdrMobile() {
            this.isMobile = true;
            this.openFilterMb = false;
            this.$store.commit({ type: "setOpenHeader", currVal: false });
        },
        handleScroll() {
            if (window.scrollY > this.pageTop + 100 || window.scrollY < this.pageTop - 100) {
                this.$store.commit({ type: "setOpenHeader", currVal: false });
                this.$store.commit({ type: "setOverlay", overlay: false })
            } 
            if (this.appPage === "home-page") {
                this.$store.commit({ type: "setShowLabels", show: true });
            }

            if (window.scrollY === 0) {
                document.querySelector(".footer-mobile").style.display = "none";
            } else {
                document.querySelector(".footer-mobile").style.display = "flex";
            }
        },
        openSearchBar() {
            this.pageTop = window.scrollY
            this.$store.commit({ type: "setOpenHeader", currVal: true });
            this.$store.commit({ type: "setOverlay", overlay: true })

            if (this.appPage === "explore-app") {
                this.$store.commit({ type: "setShowFilterBtn", show: false });
            }

            if (this.appPage === "home-page") {
                this.$store.commit({ type: "setShowLabels", show: false });
            }
        },
    },
    computed: {
        isOpenHeader() {
            return this.$store.getters.openHeader
        },
    },
    components: {
        datePicker,
        headerNav,
        openHeader,
        openHeaderMobile,
        headerFilter,
        headerMobile
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    watch: {
        isMobile() {
            if (!this.isMobile) {
                document.body.style.overflow = "hidden";
                if (window.top.scrollY > 0) {
                    this.$store.commit({ type: "setShowFilterBtn", show: false });
                }
                return;
            }
            document.body.style.overflow = "auto";
        },
        openFilterMb() {
            if (this.openFilterMb) {
                this.pageTop = window.top.scrollY;
                document.body.style.overflow = "hidden";
                return;
            }
            document.body.style.overflow = "auto";
        },
    },
};
</script>
