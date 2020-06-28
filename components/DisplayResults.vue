<template>
  <section>
    <h1>Your results</h1>
    <p aria-role="note">
      Note: Google Timeline is far from perfect, it is dependent on both how
      accurate your GPS is, and how well Google has guessed your activity. This
      tool works best with a fairly manicured timeline, i.e. you have gone in
      and corrected the locations and activities in Google Maps.
    </p>
    <p aria-role="note">
      Further, the figures used for CO2e calculations come from Mike
      Berners-Lee's book
      <cite>
        <a
          href="https://www.goodreads.com/book/show/7230015-how-bad-are-bananas"
          >How Bad Are Bananas?: The carbon footprint of everything</a
        ></cite
      >, which is somehwat outdated by now. As such, all the results should be
      seen as a rough guide.
    </p>
    <h2>Total</h2>
    <result-set :result-object="summaries.totals" />
    <div class="yearly-results">
      <section
        v-for="(year, index) in Object.keys(orderedData).reverse()"
        :key="index"
      >
        <h2>{{ year }}</h2>
        <result-set :result-object="summaries[year]" />
        <details>
          <summary>Show monthly data</summary>
          <div
            v-for="(month, index2) in Object.keys(orderedData[year])"
            :key="index2"
          >
            <h3>
              {{
                month.charAt(0).toUpperCase() +
                  month.toLocaleLowerCase().slice(1)
              }}
            </h3>
            <result-set :result-object="data[year][month]" />
          </div>
        </details>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { ORDERED_MONTHS } from 'assets/constants.js'
import ResultSet from './ResultSet.vue'
export default {
  components: { ResultSet },
  computed: {
    ...mapState(['data', 'summaries']),
    orderedData() {
      const data = {}
      const years = Object.keys(this.data)
      for (const year of years) {
        data[year] = {}
        const yearData = this.data[year]
        for (const orderedMonth of ORDERED_MONTHS) {
          if (orderedMonth in yearData) {
            data[year][orderedMonth] = yearData[orderedMonth]
          }
        }
      }
      return data
    }
  }
}
</script>

<style>
summary {
  cursor: pointer;
  font-weight: bold;
}

.yearly-results section {
  margin-bottom: 60px;
}

.yearly-results section:last-child {
  margin-bottom: 0;
}
</style>
