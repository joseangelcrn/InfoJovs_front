<template>
  <v-card :class="customClassVcard ?? 'primary'" elevation="2">
    <v-card-title
      v-if="$slots.title"
      :class="customClassTitle ?? 'white--text'"
    >
      <slot name="title"></slot>
    </v-card-title>

    <v-card-subtitle v-if="$slots.subtitle" :class="customClassSubTitle ?? ''">
      <slot name="subtitle"></slot>
    </v-card-subtitle>

    <v-card-text>
      <v-progress-circular
        :size="80"
        :width="9"
        color="white"
        indeterminate
        v-show="loading"
      ></v-progress-circular>
    </v-card-text>
    <v-card-text v-if="$slots.content" :class="customClassContent ?? ''">
      <slot name="content"></slot>
    </v-card-text>

    <v-card-actions v-if="$slots.actions" :class="customClassActions ?? ''">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    customClassVcard: {
      type: String,
      default: null,
      required: false,
    },
    customClassTitle: {
      type: String,
      default: null,
      required: false,
    },
    customClassSubTitle: {
      type: String,
      default: null,
      required: false,
    },
    customClassContent: {
      type: String,
      default: null,
      required: false,
    },
    customClassActions: {
      type: String,
      default: null,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style></style>
