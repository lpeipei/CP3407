<template>
  <div class="timeline">
    <div class="timeline-item" v-for="(event, index) in events" :key="index">
      <div :class="{'time': true, 'active': index === 0}">{{ event.time }}</div>
      <div :class="{'event': true, 'active': index === 0}">{{ event.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  computed: {
    events() {
      // Sort records chronologically based on time
      return this.records.sort((a, b) => {
        const timeA = parseInt(a.time.split(':')[0]);
        const timeB = parseInt(b.time.split(':')[0]);
        return timeA - timeB;
      });
    }
  }
};
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  background: #F6F2F1;
}

.timeline-item {
  display: flex;
  padding: 14px;
  font-size: 16px;
  color: #666;
}

.time {
  width: 80px;
  font-weight: bold;
}

.active {
    color: #EBC9CA;
}
.event {
  flex: 1;
}
</style>
