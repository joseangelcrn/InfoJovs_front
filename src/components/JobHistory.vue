<template>
  <div class="timeLineContainer">
    <v-timeline dense>
      <v-timeline-item
        v-for="(historyData, index) in history"
        :key="index"
        small
        fill-dot
        :color="$common.getStatusColor(historyData.destiny_status_id)"
        class="statusSelection"
      >
        <v-alert class="white--text mr-3" color="primary" elevation="20">
          <div class="itemContent">
            <v-chip
              small
              class="ml-2"
              :color="$common.getStatusColor(historyData.destiny_status_id)"
              label
            >
              <b> {{ historyData.status_destiny.name }} </b>
            </v-chip>
            <!-- {{ historyData.destiny_status_id }} -->
            <v-chip small class="ml-2" color="white" label>
              <b> {{ historyData.created_at }} </b>
            </v-chip>
          </div>
        </v-alert>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<style>
.timeLineContainer {
  background-color: white;
  max-height: 400px;
  overflow-y: scroll;
  box-shadow:  3px 5px 6px #072189;
  border-radius: 4px;
}
.timeLineItem{
  
}
.itemContent {
  display: flex;
  background-color: white;
  padding: 10px;
}
</style>
<script>
export default {
  name: "job-history",
  props: ["history"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
  updated() {},
};
</script>
