<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>
        edit
      </v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              Edit Meetup
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                v-model="title"
                id="title"
                required></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multi-line
                required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                @click="onSave">
                Save
              </v-btn>
              <v-btn
                flat
                @click="editDialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data() {
      return {
        editDialog: false,
        title: this.meetup.title,
        description: this.meetup.description,
      };
    },
    methods: {
      onSave() {
        if (this.title.trim === '' || this.description.trim() === '') {
          return;
        }
        this.editDialog = false;
        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          title: this.title,
          description: this.description,
        });
      },
    },
  };
</script>
