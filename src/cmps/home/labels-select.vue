<template>
    <section class="labels-select main-layout" :class="{ flex: isShowLabels, hidden: !isShowLabels }">
        <div class="labels-list">
            <homeCaruselCmp v-if="labels" :labelsArry="labels" />
        </div>
    </section>
</template>

<script>
import homeCaruselCmp from './home-carusel.cmp.vue'

export default {
    props: {
        labels: {
            type: Array,
        },
        stays: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            windowPos: 0,
        }
    },
    created() {

    },
    mounted() {
        window.addEventListener("scroll", this.stickingLabels)
    },
    unmounted() {
        window.removeEventListener("scroll", this.stickingLabels)

    },
    methods: {
        getPos() {
            this.windowPos = window.top.scrollY
        },
        stickingLabels() {
            return (this.windowPos > 100)
        },

    },
    computed: {
        isShowLabels() {
            return this.$store.getters.isShowLabels
        }
    },
    components: {
        homeCaruselCmp,
    },
}
</script>

