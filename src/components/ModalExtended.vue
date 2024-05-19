<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="display"
    @click:outside="clickOutside"
    @keydown.esc.stop="clickOutside"
  >
    <template>
      <main-card>
        <template #title v-if="$slots.title">
          <slot name="title" />
        </template>
        <template #content v-if="$slots.content">
          <slot name="content" />
        </template>
        <template #actions v-if="$slots.actions">
          <slot name="actions" />
        </template>
      </main-card>
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
