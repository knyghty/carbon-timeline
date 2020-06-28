<template>
  <main>
    <file-upload v-if="!hasFinished" @finished="hasFinished = true" />
    <display-results v-else />
  </main>
</template>

<script>
import DisplayResults from '../components/DisplayResults.vue'
import FileUpload from '../components/FileUpload.vue'

export default {
  components: { DisplayResults, FileUpload },
  data() {
    return {
      hasFinished: false
    }
  },
  head() {
    return {
      title: 'Carbon Timeline Calculator',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Calculate your travel carbon footprint from your Google Timeline / Location History data'
        }
      ]
    }
  }
}
</script>
<style></style>
