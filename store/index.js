export default {
  state() {
    return {
      user: {},
      activeFilters: {},
      carts: [],
      bannerTitle: "",
      locations: [],
      mobileView: false,
      confirmModal: false,
    };
  },
  mutations: {
    UPDATE_FILTERS(state, payload) {
      state.activeFilters = payload;
    },
    SET_BANNER_TITLE(state, payload) {
      state.bannerTitle = payload;
    },
    SET_LOCATIONS(state, payload) {
      state.locations = payload;
    },
    ADD_TO_CART(state, item) {
      state.carts.push(item);
    },
    REMOVE_FROM_CART(state, index) {
      state.carts.splice(index, 1);
    },
    RESET_ADD_TO_CART_CARTS(state) {
      state.carts = [];
    },
    UPDATE_VIEW(state, payload) {
      state.mobileView = payload;
    },
    SHOW_CONFIRM_MODAL(state, payload) {
      state.confirmModal = payload;
    },
  },
  actions: {
    updateFilters({ commit }, payload) {
      commit("UPDATE_FILTERS", payload);
    },
    setLocations({ commit }, payload) {
      commit("SET_LOCATIONS", payload);
    },
    addToCart({ commit }, item) {
      commit("ADD_TO_CART", item);
    },
    removeFromCart({ commit }, index) {
      commit("REMOVE_FROM_CART", index);
    },
    resetAddToCarts({ commit }) {
      commit("RESET_ADD_TO_CART_CARTS");
    },
    showConfirmModal({ commit }, payload) {
      commit("SHOW_CONFIRM_MODAL", payload);
    },
  },
  getters: {
    cartItems: (state) => state.carts,
    getLocations: (state) => state.locations,
  },
};
