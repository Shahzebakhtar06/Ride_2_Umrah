export default {
  state() {
    return {
      user: {},
      activeFilters: {},
      cart: [],
      bannerTitle: "",
      locations: [],
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
      state.cart.push(item);
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
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
  },
  getters: {
    cartItems: (state) => state.cart,
    getLocations: (state) => state.locations,
  },
};
