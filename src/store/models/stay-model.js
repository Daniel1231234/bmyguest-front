import { stayService } from "../../services/stay.service-toback.js"

export default {
  state: {
    stays: [],
    currStay: {},
    filterBy: { dest: "", price: { min: "", max: "" } },
    sortBy: {},
    imgToDisplayCard: {},
    labels: {},
    currDate: [],
    orders: [],
    currHostStay: [],
    totalStays: [],
  },
  getters: {
    stays(state) {
      return state.stays
    },
    totalStays(state) {
      return state.totalStays
    },
    getImg(state) {
      return state.imgToDisplay
    },
    getLebels(state) {
      return state.labels
    },
    getCurrStay(state) {
      return state.currStay
    },
    getIsWished(state) {
      return state.currStay.wished
    },
    getCurrDate(state) {
      return state.currDate
    },
    getCurrHostStay(state) {
      return state.currHostStay
    },
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays
    },
    setTotalStays(state, { tStays }) {
      state.totalStays = tStays
    },
    setLabels(state, { labels }) {
      state.labels = labels
    },
    setStayById(state, { stay }) {
      state.currStay = { ...stay }
    },
    wishStay(state) {
      state.currStay.wished = !state.currStay.wished
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
    setCurrDate(state, { date }) {
      state.currDate = date
    },
    setCurrStay1(state, { stay }) {
      state.currStay = stay
    },
    setHostStays(state, { id }) {
      let stayHost = state.stays.filter((stay) => stay.host.id === id)
      state.currHostStay = stayHost
    },
  },
  actions: {
    async loadStays({ commit }, { filterBy }) {
      commit({ type: "setFilterBy", filterBy })
      try {
        const stays = await stayService.query(filterBy)
        console.log(stays)
        if (stays.length === 62) {
          const tStays = structuredClone(stays)
          commit({type: "setTotalStays", tStays})
        }
        commit({ type: "setStays", stays })
        return stays
      } catch (err) {
        console.log("Error in query stays (store)", err)
        throw err
      }
    },
    loadLabels({ commit }) {
      let labels = stayService.getLabels()
      commit({ type: "setLabels", labels })
    },
    async loadById({ commit }, { id }) {
      try {
        const stay = await stayService.getById(id)
        commit({ type: "setStayById", stay })
      } catch (err) {
        console.log("Error in getById stays (store)", err)
        throw err
      }
    },

    wishStay({ commit }, { stay }) {
      stayService.update(stay)
      commit({ type: "setStayById", stay })
      commit({ type: "wishStay" })
    },
    loadCurrDate({ commit }, { date }) {
      commit({ type: "setCurrDate", date })
    },
    async saveStay({ commit }, { stay }) {
      try {
        const stayToSave = await stayService.save(stay)
        commit({ type: "setStays" })
        return stayToSave
      } catch (err) {
        console.log("Error: cannot save stay", err)
        throw err
      }
    },
    async getStaysByHost({ commit }, { id }) {
      const staysahostArrey = stayService.getHostStays(id)
      return staysahostArrey
    },
  },
}
