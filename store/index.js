export default {
  state() {
    return {
      user: {},
      activeFilters: {},
      cart: [],
      bannerTitle: "",
    };
  },
  mutations: {
    UPDATE_FILTERS(state, payload) {
      state.activeFilters = payload;
    },
    SET_BANNER_TITLE(state, payload) {
      state.bannerTitle = payload;
    },
    ADD_TO_CART(state, item) {
      state.cart.push(item);
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    addToCart({ commit }, item) {
      commit("ADD_TO_CART", item);
    },
    removeFromCart({ commit }, index) {
      commit("REMOVE_FROM_CART", index);
    },
  },
  getters: {
    cartItems: (state) => state.cart,
  },
};
