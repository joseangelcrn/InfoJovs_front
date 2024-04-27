<template>
  <v-card class="primary" elevation="2">
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>

    <v-card-subtitle>
      <slot name="subtitle"></slot>
    </v-card-subtitle>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>