<template>
  <v-tooltip bottom :color="computedColor">
    <template v-slot:activator="{ on, attrs }">
        <span
            v-bind="attrs"
            v-on="on"
        >
        <slot></slot>
        </span>
    </template>
    <span>{{computedText}}</span>
  </v-tooltip>
</template>

<script>

export default {
  name:'Tooltip',
  props:['text','primary'],
  data: () => ({

  }),
  computed: {
    computedText(){
      console.log('computed text = ',this.$props)
      return this.$props.text;
    },
    computedColor(){
      if (this.$props.primary){
        return 'primary white--text';
      }
      return 'white primary--text';
    }
  },
};
</script>
