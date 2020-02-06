import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import { mutations } from "./types";

let axios = Axios.create({ baseURL: process.env.BASE_URL });

Vue.use(Vuex);

const _CURRENT_COMIC_ENDPOINT = "/info.0.json";
const _AMOUNT_OF_COMICS = 10;

export default new Vuex.Store({
  // STATE
  state: {
    currentComic: {},
    previousComics: [],
    comics: [],
    selectedComic: {},
    loading: false
  },

  // GETTERS
  // instead of using value directly throuh $store, we can use getters
  getters: {
    loading(state) {
      return state.loading;
    },
    comics(state) {
      // merge current comic and previous comic
      return state.comics;
    },
    currentComic(state) {
      return state.currentComic;
    },
    selectedComic(state) {
      return state.selectedComic;
    }
  },

  // MUTATIONS
  // mutations are preferred to access through actions only, not directly from templates
  mutations: {
    [mutations.START_LOADING](state) {
      state.loading = true;
    },
    [mutations.FINISH_LOADING](state) {
      state.loading = false;
    },
    [mutations.SET_CURRENT_COMIC](state, comic) {
      state.currentComic = comic;
    },
    [mutations.SET_CURRENT_COMIC_FAILED](state, err) {
      console.error(err);
      state.currentComic = {};
      state.loading = false;
    },
    [mutations.SET_PREVIOUS_COMICS](state, comics) {
      state.previousComics = comics;
      // save all comics separately so you can display all at once
      state.comics = [state.currentComic].concat(state.previousComics);
    },
    [mutations.SET_PREVIOUS_COMICS_FAILED](err, state) {
      state.loading = false;
      state.previousComics = [];
      console.error(err);
    },
    [mutations.SELECT_COMIC](state, comic) {
      state.selectedComic = comic;
    },
    [mutations.SELECT_COMIC_FAILED](state, err) {
      state.loading = false;
      state.selectedComic = {};
      console.error(err);
    }
  },

  // ACTIONS
  // actions can be used on templates and they can commit mutations (like setters)
  actions: {
    /** @description fetches the latest comic from API */
    async fetchCurrentComic({ commit }) {
      try {
        const { data } = await axios.get(`${_CURRENT_COMIC_ENDPOINT}`);
        commit(mutations.SET_CURRENT_COMIC, data);
      } catch (error) {
        commit(mutations.SET_CURRENT_COMIC_FAILED, error);
      }
    },
    /**
     * @description fetches comic by number from API
     * used when specific comic number not available and needed
     * e.g. when entering directly to comic page and no previous data available
     * allows also sharing comic page links
     * @param {Number} number
     */
    async fetchComicByNumber({ commit }, number) {
      try {
        commit(mutations.START_LOADING);
        const { data } = await axios.get(`${number}/info.0.json`);
        commit(mutations.SELECT_COMIC, data);
        commit(mutations.FINISH_LOADING);
      } catch (error) {
        commit(mutations.SELECT_COMIC_FAILED, error);
      }
    },
    /**
     * @description fetches n previous comics from API
     */
    fetchPreviousComics({ commit, state }) {
      // fetch previous only if current comic fetch was successful
      if (!state.currentComic.num) {
        commit(
          mutations.SET_PREVIOUS_COMICS_FAILED,
          "Could not fetch previous comics because current comic number was not found"
        );
      }

      // generate requests for all required comics
      const previousComicPromises = [];
      // start from 1 as current comic is already fetchhed
      for (let i = 1; i < _AMOUNT_OF_COMICS; i++) {
        const url = `/${state.currentComic.num - i}/info.0.json`;
        previousComicPromises.push(axios.get(url));
      }

      // The Promise.all() method returns a single Promise that fulfills when all of the promises passed.
      // Other options could be to use axios.all() but apparently it is not supported on IE so native Promise is safer choice here
      Promise.all(previousComicPromises)
        .then(res => {
          commit(
            mutations.SET_PREVIOUS_COMICS,
            // select only data from successful response
            res.map(r => r.data)
          );
        })
        .catch(err => {
          commit(mutations.SET_PREVIOUS_COMICS_FAILED, err);
        });
    },
    /**
     * @description fetches last n commits from the API, where n = _AMOUNT_OF_COMICS
     * */
    async fetchComics({ commit, dispatch }) {
      // errors are handled inside functions so no need for try catch here anymore
      commit(mutations.START_LOADING);

      // first wait that we get current commit to see what is the current comic number
      await dispatch("fetchCurrentComic");

      // when we know the current comic number, we can request previous comic numbers by substracting from current comic number.
      await dispatch("fetchPreviousComics");

      commit(mutations.FINISH_LOADING);
    },

    /**
     * @description sets currently selected comic to store
     * @param {Object} comic
     */
    selectComic({ commit }, comic) {
      commit(mutations.SELECT_COMIC, comic);
    }
  },
  // MODULES
  // extract comics into its own module if there will be other bigger parts in the app
  modules: {}
});
