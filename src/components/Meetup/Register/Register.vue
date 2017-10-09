<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn class="primary" accent slot="activator">
      {{ isRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="isRegistered">
              Unregister for meetup
            </v-card-title>
            <v-card-title v-else>
              Register from meetup
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              register
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-btn class="red--text darken-1" flat @click="registerDialog = false">
                Cancel
              </v-btn>
              <v-btn class="green--text darken-1" flat @click="onSave">
                Confirm
              </v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data() {
      return {
        registerDialog: false,
      };
    },
    computed: {
      isRegistered() {
        return this.$store.getters.user.registeredMeetups
            .findIndex(meetupId => meetupId === this.meetupId) >= 0;
      },
    },
    methods: {
      onSave() {
        if (this.isRegistered) {
          this.$store.dispatch('unregisterUserForMeetup', this.meetupId);
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId);
        }
      },
    },
  };
</script>
