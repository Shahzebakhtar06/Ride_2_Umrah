export default {
  state() {
    return {
      user: {},
      activeFilters: {},
      bannerTitle: '',
    };
  },
  mutations: {
    updateFilters(state, payload) {
      state.activeFilters = payload;
    },
    setBannerTitle(state, payload) {
      state.bannerTitle = payload;
    },
  },
};
