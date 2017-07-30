import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        date: '2017-07-11',
        imageUrl: 'https://i.ytimg.com/vi/Z3HvId-Ojp4/maxresdefault.jpg',
        title: 'Ponny',
        id: '1',
      },
      {
        date: '2017-08-11',
        imageUrl: 'http://img09.deviantart.net/985f/i/2012/344/e/e/look_at_da_pwetty_blue_ponny__by_beavernator-d5nla0j.png',
        title: 'Ponny',
        id: '2',
      },
    ],
    user: {
      id: 1,
      registeredMeetups: ['1'],
    },
  },
  mutations: {},
  actions: {},
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => a.date > b.date);
    },
    loadedMeetup(state) {
      return meetupId => state.loadedMeetups.find(meetup => meetup.id === meetupId);
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
  },
});
