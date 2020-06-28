<template>
  <ul>
    <activity-item
      v-for="(distance, index) in resultObject"
      :key="index"
      :activity="index"
      :distance="distance"
    />
  </ul>
</template>

<script>
import ActivityItem from './Activity.vue'
export default {
  components: { ActivityItem },
  props: {
    resultObject: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  width: 100%;
  padding: 7px 0 7px 4px;
}

@media (min-width: 680px) {
  li {
    width: 50%;
    padding-right: 22px;
  }
}

@media (min-width: 1000px) {
  li {
    width: 33.33333%;
  }
}
</style>
