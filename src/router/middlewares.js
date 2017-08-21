import store from '../store';

export default {
  isAuth(to, from, next) {
    if (store.getters.user) {
      next();
    } else {
      next('/signin');
    }
  },
};
