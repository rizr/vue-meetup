import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Meetups from '@/components/Meetup/Meetups';
import CreateMeetup from '@/components/Meetup/CreateMeetup';
import Meetup from '@/components/Meetup/Meetup';
import Profile from '@/components/User/Profile';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
import Middlewares from './middlewares';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup,
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetups',
      component: CreateMeetup,
      beforeEnter: Middlewares.isAuth,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: Middlewares.isAuth,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
  ],
});
