<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="display"
    @click:outside="clickOutside"
    @keydown.esc.stop="clickOutside"
  >
    <template>
      <v-card>
        <v-card-text class="mt-3 text-center text-h5">
          <slot name="content" />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: "modal-extended",
  props: ["show", "title"],
  data() {
    return {};
  },
  created() {},
  methods: {
    clickOutside: function(){
      this.$emit('clickOutside',true);
    }
  },
  computed: {
    display: {
      // getter
      get: function () {
        return this.$props.show;
      },
      // setter
      set: function (newValue) {},
    },
  },
};
</script>
