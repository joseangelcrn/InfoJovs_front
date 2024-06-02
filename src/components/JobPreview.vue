<template>
  <v-list-item three-line class="white rounded mt-2">
    <v-list-item-content>
      <v-list-item-title>{{ job.title }}</v-list-item-title>
      <v-list-item-subtitle v-if="candStatus" :class="$common.getStatusColor(candStatus.id)  + '--text'">{{
        candStatus.name
      }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ job.description }}</v-list-item-subtitle>
      <v-list-item-subtitle class="mt-1">
        <v-chip  v-for="(tag,index) in job.tags" :key="index" class="mr-1" small color="primary" >{{tag.name}}</v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon class="mt-6" style="display: flex; align-items: center;" >
      <v-btn x-small class="align-center primary white--text" style="height: 25px;width: 25px;" :to="{name:'jobDetails',params:{id:job.id}}" > <v-icon>mdi-eye</v-icon> </v-btn>
      <v-btn v-if="canEdit" x-small class="align-center primary white--text ml-2" style="height: 25px;width: 25px;" :to="{name:'offerJob',params:{id:job.id}}" > <v-icon>mdi-pencil</v-icon> </v-btn>
    </v-list-item-icon>
  </v-list-item>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "job-preview",
  props: {
    job: {
      type: Object,
      required: true,
    },
    candStatus:{
      type:Object,
      required:false
    }
  },

  data() {
    return {
      canEdit:false
    };
  },
  methods: {
    refreshCanEdit: function(){
      this.canEdit = (this.user.data.id == this.$props.job.recruiter_id);
    }
  },
  computed:{
    ...mapState(['user'])
  },
  mounted() {
    this.refreshCanEdit();
  },
  updated() {
    this.refreshCanEdit();
  },
};
</script>
