import { createStore } from "vuex";
import stayModul from "./models/stay-model.js";
import orderModul from "./models/order-model.js";
import userModul from "./models/user-model.js";

const store = createStore({
  strict: true,
  state: {
    currPage: "",
    openHeader: false,
    isOverlay: false,
    isShowLabels: true,
    showFilterBtn: false,
  },
  getters: {
    currPage(state) {
      return state.currPage;
    },
    openHeader(state) {
      return state.openHeader;
    },
    isOverlay(state) {
      return state.isOverlay;
    },
    isShowLabels(state) {
      return state.isShowLabels;
    },
    showFilterBtn(state) {
      return state.showFilterBtn;
    },
  },
  mutations: {
    setCurrPage(state, { page }) {
      state.currPage = page;
    },
    setOpenHeader(state, { currVal }) {
      state.openHeader = currVal;
    },
    setOverlay(state, { overlay }) {
      state.isOverlay = overlay;
    },
    setShowLabels(state, { show }) {
      state.isShowLabels = show;
    },
    setShowFilterBtn(state, { show }) {
      state.showFilterBtn = show;
    },
  },
  actions: {},
  modules: {
    stayModul,
    orderModul,
    userModul,
  },
});

export default store;
