<template>
  <v-dialog
    transition="dialog-bottom-transition"
    :width="computedWidth"
    v-model="display"
    @click:outside="clickOutside"
    @keydown.esc.stop="clickOutside"
    :persistent="computedPersistent"
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
  props: ["show", "title","width",'persistent'],
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

    computedWidth(){
      return this.$props.width ?? 600;
    },
    computedPersistent(){
      return this.$props.persistent ?? false;
    }
  },
};
</script>
