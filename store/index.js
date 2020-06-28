export const state = () => ({
  data: {},
  summaries: {}
})

export const mutations = {
  mergeData(state, payload) {
    const key = Object.keys(payload)[0]
    const earliestTimestampMs = payload[key].earliestTimestampMs
    delete payload[key].earliestTimestampMs

    if (earliestTimestampMs) {
      const [year, month] = key.split('_')
      if (!(year in state.data)) {
        state.data[year] = {}
      }
      state.data[year][month] = payload[key].counter
    }
  },
  calculateSummaries(state) {
    const totals = {}
    for (const year in state.data) {
      const yearTotals = {}
      for (const month in state.data[year]) {
        for (const activity in state.data[year][month]) {
          if (!(activity in totals)) {
            totals[activity] = 0
          }
          if (!(activity in yearTotals)) {
            yearTotals[activity] = 0
          }
          totals[activity] += state.data[year][month][activity]
          yearTotals[activity] += state.data[year][month][activity]
        }
      }
      state.summaries[year] = yearTotals
    }
    state.summaries.totals = totals
  }
}
