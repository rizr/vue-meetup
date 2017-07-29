<template>
  <v-container>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/new" class="info">Organise Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-carousel>
        <v-carousel-item
          v-for="(meetup,i) in meetups"
          :src="meetup.imageUrl"
          :key="meetup.id">
        </v-carousel-item>
      </v-carousel>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        meetups: [
          {
            imageUrl: 'https://i.ytimg.com/vi/Z3HvId-Ojp4/maxresdefault.jpg',
            title: 'Ponny',
            id: 'maxresdefault',
          },
          {
            imageUrl: 'http://img09.deviantart.net/985f/i/2012/344/e/e/look_at_da_pwetty_blue_ponny__by_beavernator-d5nla0j.png',
            title: 'Ponny',
            id: 'd5nla0j',
          },
        ],
      };
    },
  };
</script>
