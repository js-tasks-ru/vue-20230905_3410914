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
      type: Array
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

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

</style>
