<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="prevMonth">
        </button>
        <div class="calendar-view__date">{{ titleDate }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth"></button>
      </div>
    </div>
    <div class="calendar-view__grid">
      <div v-for="day in days" :key="day">
        <CalendarCell :date="day" :chosenDate="currentDate" :meetups="meetupsByDate[day.toLocaleDateString()]"/>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarCell from "./CalendarCell";

export default {
  name: 'MeetupsCalendar',
  components: {
    CalendarCell
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentDate: new Date(),
      counter: 0,
    }
  },

  methods: {
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
  },

  computed: {
    days() {
      let month = [];
      let start = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)

      if (start.getDay() === 0) {
        start.setDate(start.getDate() - start.getDay() - 6)
      } else {
        start.setDate(start.getDate() - start.getDay() + 1)
      }

      let end = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0)

      if (end.getDay() !== 0) {
        end.setDate((end.getDate() - end.getDay() + 7))
      }

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        month.push(new Date(d))
      }

      return month;
    },
    titleDate() {
      return new Date(this.currentDate).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
      })
    },
    meetupsByDate() {
      let meetups = {}
      for (let meetup of this.meetups) {
        if (new Date(meetup.date).toLocaleDateString() in meetups) {
          meetups[new Date(meetup.date).toLocaleDateString()].push(meetup)
        } else {
          meetups[new Date(meetup.date).toLocaleDateString()] = [meetup]
        }
      }
      return meetups
    }
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
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

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

:deep(.calendar-event) {
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

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
