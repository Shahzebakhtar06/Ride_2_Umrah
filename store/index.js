export default {
  state() {
    return {
      user: {},
      activeFilters: {},
    };
  },
  mutations: {
    updateFilters(state, payload) {
      state.activeFilters = payload;
    },
  },
};
