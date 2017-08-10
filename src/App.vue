<template>
  <v-app light>
    <v-navigation-drawer disable-route-watcher v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-action>
            {{ item.title }}
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon dark left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
      };
    },
    computed: {
      menuItems() {
        let menuItems = [
          {
            icon: 'face',
            title: 'Signup',
            link: '/signup',
          },
          {
            icon: 'lock_open',
            title: 'Sign in',
            link: '/signin',
          },
        ];

        if (this.userIsAuthenticated) {
          menuItems = [
            {
              icon: 'supervisor_account',
              title: 'View Meetups',
              link: '/meetups',
            },
            {
              icon: 'room',
              title: 'Organize Meetups',
              link: '/meetup/new',
            },
            {
              icon: 'person',
              title: 'Profile',
              link: '/profile',
            },
          ];
        }
        return menuItems;
      },
      userIsAuthenticated() {
        const user = this.$store.getters.user;
        return user && user !== null && user !== undefined;
      },
    },
  };
</script>

<style lang="stylus">
  @import './stylus/main';
</style>
