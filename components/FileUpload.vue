<template>
  <section>
    <div v-show="!isRunning">
      <h1>Carbon Timeline</h1>
      <p>
        This tool can be used to calculate the distance traveled and CO2e
        emissions for Google Timeline users.
      </p>
      <p>Instructions:</p>
      <ol>
        <li>
          Head to <a href="https://takeout.google.com/">Google Takeout</a>
        </li>
        <li>
          Make sure you're logged into the account you use for your phone.
        </li>
        <li>Hit “deselect all”, then select “Location History”.</li>
        <li>
          Choose “Next step” and make sure you download the data as a zip.
        </li>
        <li>Choose the file (the entire zip) below.</li>
      </ol>
      <form>
        <input
          id="file"
          type="file"
          accept="application/zip"
          @change="handleFile"
        />
        <label for="file" role="button" tabindex="0">choose a file</label>
        <p v-show="hasError" class="error">Something went wrong.</p>
      </form>
      <p aria-role="note">
        Note: This tool runs entirely on your device. No data is uploaded
        anywhere.
      </p>
    </div>
    <h1 v-show="isRunning">Loading results &hellip;</h1>
    <progress
      v-show="isRunning"
      :value="completedFiles"
      :max="totalFiles"
    ></progress>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import JSZip from 'jszip'
import calculations from 'assets/calculations'

export default {
  name: 'FileUpload',
  components: {},
  data() {
    return {
      completedFiles: 0,
      totalFiles: 0,
      hasError: false,
      isRunning: false
    }
  },
  computed: mapState(['data']),
  methods: {
    ...mapMutations(['mergeData', 'calculateSummaries']),
    handleFile(event) {
      const context = this
      context.hasError = false
      const uploadedFile = event.target.files[0]
      const reader = new FileReader()
      reader.onload = function() {
        const zipFile = new JSZip()
        zipFile.loadAsync(reader.result).then(function(zip) {
          const dataFiles = zip.file(
            /^Takeout\/Location History\/Semantic Location History\/.*\.json$/
          )
          context.totalFiles = dataFiles.length
          if (!context.totalFiles) {
            context.hasError = true
          } else {
            context.isRunning = true
          }
          for (const dataFile of dataFiles) {
            dataFile.async('string').then(
              function success(content) {
                const yearMonth = dataFile.name
                  .split('/')
                  .slice(-1)[0]
                  .split('.')[0]
                context.mergeData({
                  [yearMonth]: calculations.processFile(JSON.parse(content))
                })
                context.completedFiles += 1
                if (context.completedFiles === context.totalFiles) {
                  context.calculateSummaries()
                  context.$emit('finished')
                }
              },
              function error(e) {
                context.hasError = true
              }
            )
          }
        })
      }
      reader.readAsBinaryString(uploadedFile)
    }
  }
}
</script>

<style>
[type='file'] {
  display: none;
}

[type='file'] + label {
  display: block;

  border-radius: 5px;
  margin: 40px auto;
  padding: 20px 30px;
  max-width: 200px;

  background: #007a52;

  color: #fff;
  font-weight: bold;
  text-align: center;

  cursor: pointer;
}

[type='file'] + label:focus,
[type='file'] + label:hover {
  background: #00b377;
}

progress {
  display: block;

  margin: 0 auto;
  margin-top: 40px;

  width: 80%;
}

.error {
  color: red;
}
</style>
