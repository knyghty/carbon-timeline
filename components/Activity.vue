<template>
  <li :class="activityClass">
    {{ activityName }}: {{ Math.round(distanceKm).toLocaleString() }} km,
    <span
      :title="activity in co2eExplanation ? co2eExplanation[activity] : false"
      >{{ co2eDisplay }} CO2e</span
    >
  </li>
</template>

<script>
export default {
  props: {
    distance: {
      type: Number,
      default() {
        return 0
      }
    },
    activity: {
      type: String,
      default() {
        return 'Unknown'
      }
    }
  },
  data() {
    return {
      co2ePerKm: {
        WALKING: 0,
        IN_PASSENGER_VEHICLE: 0.4402,
        IN_TRAIN: 0.093,
        IN_BUS: 0.1,
        CYCLING: 0,
        RUNNING: 0,
        IN_WHEELCHAIR: 0,
        MOTORCYCLING: null,
        HIKING: 0,
        IN_TRAM: 0.1178,
        FLYING: 0.6,
        SAILING: 0,
        IN_SUBWAY: 0.0992,
        HORSEBACK_RIDING: 0,
        SKIING: 0,
        SWIMMING: 0,
        BOATING: null,
        IN_FERRY: null,
        WALKING_NORDIC: 0,
        KAYAKING: 0,
        SLEDDING: 0,
        SNOWMOBILE: null,
        IN_FUNICULAR: null,
        SKATING: 0,
        KITESURFING: 0,
        SNOWSHOEING: 0,
        IN_VEHICLE: 0.4402,
        SNOWBOARDING: 0,
        SURFING: 0,
        IN_GONDOLA_LIFT: null,
        IN_CABLECAR: null,
        SKATEBOARDING: 0,
        ROWING: 0,
        CATCHING_POKEMON: 0
      },
      co2eExplanation: {
        FLYING:
          'Rough estimate based somewhere between short-haul and long-haul flights. Assumes economy class.',
        IN_BUS: 'Assumes a diesel coach.',
        IN_TRAIN:
          'Assumes coach (standard) class. Double this figure if you ride first class.',
        IN_PASSENGER_VEHICLE: 'Assumes average UK car.',
        IN_VEHICLE: 'Assumes an average UK car.',
        WALKING:
          "Strictly speaking, expends food calories, but assuming zero since it's diet-dependant."
      }
    }
  },
  computed: {
    activityClass() {
      return this.activity.toLowerCase().replace(/_/g, '-')
    },
    activityName() {
      if (this.activity === 'IN_PASSENGER_VEHICLE') {
        return 'In vehicle'
      }
      if (this.activity === 'WALKING_NORDIC') {
        return 'Nordic walking'
      }
      return (
        this.activity.charAt(0) +
        this.activity
          .toLowerCase()
          .replace(/_/g, ' ')
          .slice(1)
      )
    },
    distanceKm() {
      return this.distance / 1000
    },
    co2eDisplay() {
      if (this.co2ePerKm[this.activity] === null) {
        return 'unknown'
      }
      const co2eKg = this.co2ePerKm[this.activity] * this.distanceKm
      if (co2eKg < 1000) {
        return `${Math.round(co2eKg)} kg`
      } else {
        return `${(co2eKg / 1000).toFixed(2).toLocaleString()} tons`
      }
    }
  }
}
</script>

<style>
[title] {
  border-bottom: 3px dotted green;
  cursor: help;
}

.boating {
  list-style-type: '🛥️ ';
}
.catching-pokemon {
  list-style-type: '🧢 ';
}
.cycling {
  list-style-type: '🚲 ';
}
.flying {
  list-style-type: '✈️ ';
}
.hiking,
.walking-nordic {
  list-style-type: '🥾 ';
}
.horseback-riding {
  list-style-type: '🐎 ';
}
.in-bus {
  list-style-type: '🚍 ';
}
.in-cablecar {
  list-style-type: '🚠 ';
}
.in-ferry {
  list-style-type: '⛴️ ';
}
.in-funicular {
  list-style-type: '🚞 ';
}
.in-gondola-lift {
  list-style-type: '🚡 ';
}
.in-subway {
  list-style-type: '🚇 ';
}
.in-vehicle,
.in-passenger-vehicle {
  list-style-type: '🚘 ';
}
.in-train {
  list-style-type: '🚆 ';
}
.in-tram {
  list-style-type: '🚊 ';
}
.in-wheelchair {
  list-style-type: '🦽 ';
}
.kayaking,
.rowing {
  list-style-type: '🚣 ';
}
.kitesurfing {
  list-style-type: '🪁 ';
}
.motorcycling {
  list-style-type: '🏍️ ';
}
.running {
  list-style-type: '🏃 ';
}
.sailing {
  list-style-type: '⛵ ';
}
.skateboarding {
  list-style-type: '🛹 ';
}
.skating {
  list-style-type: '🛼 ';
}
.skiing {
  list-style-type: '⛷️ ';
}
.sledding {
  list-style-type: '🛷 ';
}
.snowboarding {
  list-style-type: '🏂 ';
}
.snowmobile {
  list-style-type: '❄️ ';
}
.snowshoeing {
  list-style-type: '☃️ ';
}
.surfing {
  list-style-type: '🏄 ';
}
.swimming {
  list-style-type: '🏊 ';
}
.walking {
  list-style-type: '🚶 ';
}
</style>
