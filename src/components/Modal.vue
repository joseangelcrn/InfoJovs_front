<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="modal.show"
  >
    <template>
      <v-card>
        <v-toolbar color="primary" dark dense>{{ modal.title }}</v-toolbar>
        <v-card-text class="mt-3 text-center text-h5">
          {{ modal.text }}
        </v-card-text>

        <v-card-actions
          v-if="modal.textBtnYes && !modal.textBtnNot"
          class="justify-end"
        >
          <v-btn class="primary" text @click="modal.onClickYes()">{{
            modal.textBtnYes
          }}</v-btn>
        </v-card-actions>

        <v-card-actions
          v-else-if="modal.textBtnYes && modal.textBtnNot"
          class="justify-space-between"
        >
          <v-btn class="primary" text @click="modal.onClickYes()">{{
            modal.textBtnYes
          }}</v-btn>
          <v-btn class="red" text @click="modal.onClickNot()">{{
            modal.textBtnNot
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "modal",
  // props: ["show", "title", "text", "btnOk", "btnCancel","onClickOk"],
  data() {
    return {
    };
  },
  created() {
    // console.log("created !");
    // console.log(this.$props);
    console.log("vuex modal  - created");
    console.log(this.modal);
  },
  methods: {
    onBtnOk: function () {
      console.log("modal - on btn ok ");

      if (this.modalOnClickOk) {
        // return this.modalBtnOk.onClick();
      }
    },
  },
  computed: {
    ...mapState(["modal"]),
  },
};
</script>
