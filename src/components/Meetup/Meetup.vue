<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ meetup.title }}</h6>
            <template v-if="isCreator">
              <v-spacer></v-spacer>
              <edit-meetup-dialog :meetup="meetup"></edit-meetup-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | date }} - {{ meetup.location }}
              <div>
                <edit-meetup-date :meetup="meetup" v-if="true"></edit-meetup-date>
              </div>
            </div>
            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-dialog :meetupId="id" v-if="userIsAuth"></register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      id: String,
    },
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetup(this.id);
      },
      userIsAuth() {
        const user = this.$store.getters.user;
        return user !== null || user !== undefined;
      },
      isCreator() {
        if (!this.userIsAuth) {
          return false;
        }
        return this.$store.getters.user === this.$store.getters.loadedMeetup(this.id).creatorId;
      },
      loading() {
        return this.$store.getters.loading;
      },
    },
  };
</script>
