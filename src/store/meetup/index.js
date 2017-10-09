import * as firebase from 'firebase';

export default {
  state: {
    loadedMeetups: [],
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      // eslint-disable-next-line
      let meetup = state.loadedMeetups.find(elem => elem.id === payload.id);
      meetup = Object.assign(meetup, payload);
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then((response) => {
          commit('setLoading', false);
          const data = response.val();
          if (data) {
            const meetups = Object.keys(data).map(objectId =>
              ({ ...data[objectId], id: objectId }));
            commit('setLoadedMeetups', meetups);
          }
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = Object.assign({}, payload);
      let id;
      let imageUrl;
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => data.key)
        .then((key) => {
          id = key;
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase
            .storage()
            .ref(`meetups/${key}.${ext}`)
            .put(payload.image);
        })
        .then((fileData) => {
          imageUrl = fileData.metadata.downloadURLs[0];
          return firebase.database()
            .ref('meetups')
            .child(id)
            .update({ imageUrl });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl,
            id,
            creatorId: getters.user.id,
          });
        });
    },
    updateMeetup({ commit }, payload) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('/meetups')
        .child(payload.id)
        .update(payload)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetup', payload);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
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
};
