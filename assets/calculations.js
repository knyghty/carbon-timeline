export default {
  processFile(data) {
    let earliestTimestampMs = null
    const counter = {}
    const timelineObjects = data.timelineObjects
    for (const timelineObject of timelineObjects) {
      const activitySegment = timelineObject.activitySegment
      if (!activitySegment) {
        continue
      }
      if (
        'activityType' in activitySegment &&
        'distance' in activitySegment &&
        ['MEDIUM', 'HIGH'].includes(activitySegment.confidence)
      ) {
        if (activitySegment.activityType in counter) {
          counter[activitySegment.activityType] += activitySegment.distance
        } else {
          counter[activitySegment.activityType] = activitySegment.distance
        }
        let timestampMs = null
        if ('duration' in activitySegment) {
          timestampMs = activitySegment.duration.startTimestampMs
        }
        if (!earliestTimestampMs || timestampMs < earliestTimestampMs) {
          earliestTimestampMs = timestampMs
        }
      }
    }
    return { earliestTimestampMs, counter }
  }
}
