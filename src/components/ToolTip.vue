<template>
  <v-tooltip  :right="computedPosition.right" :left="computedPosition.left" :bottom="computedPosition.bottom" :top="computedPosition.top" :color="computedColor">
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
  props:['text','primary','position'],
  data: () => ({

  }),
  computed: {
    computedText(){
      return this.$props.text;
    },
    computedColor(){
      if (this.$props.primary){
        return 'primary white--text';
      }
      return 'white primary--text';
    },
    computedPosition(){
      let position = {
        top:false,
        right:false,
        left:false,
        bottom:false
      };

     if (this.$props.position === 'left'){
        position.left = true;
      }
      else if (this.$props.position === 'top'){
        position.top = true;
      }
      else if (this.$props.position === 'bottom'){
        position.bottom = true;
      }
      else {
         position.right = true;
     }
      return position;

    }
  },
};
</script>
