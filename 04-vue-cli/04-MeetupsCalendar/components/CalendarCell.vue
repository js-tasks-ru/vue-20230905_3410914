<template>
  <div
    class="calendar-view__cell"
    :class="{ 'calendar-view__cell_inactive' : !active, 'calendar-view__cell__current' : today }"
    tabindex="0">
    <div class="calendar-view__cell-day">{{ date.getDate() }}</div>
    <div class="calendar-view__cell-content">
      <div v-for="meetup in meetups" :key="meetup.id">
        <a :href="`/meetups/${meetup.id}`" class="calendar-event">{{ meetup.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarCell",

  props: {
    date: {
      type: Date
    },
    chosenDate: {
      type: Date
    },
    meetups: {
      type: Object
    }
  },

  computed: {
    active() {
      return this.date.getMonth() === this.chosenDate.getMonth()
    },
    today() {
      return this.date.toDateString() === new Date().toDateString()
    }
  }
}
</script>

<style scoped>
.calendar-view__cell__current {
  background-color: #D8F3FF;
}
</style>
