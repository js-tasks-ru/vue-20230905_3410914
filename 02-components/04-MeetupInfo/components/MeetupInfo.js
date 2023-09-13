import {defineComponent} from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  props: {
    organizer: {
      options: {
        type: String,
        required: true
      }
    },
    place: {
      options: {
        type: String,
        required: true
      }
    },
    date: {
      options: {
        type: Number,
        required: true
      }
    },
  },
  template: `
    <ul class="meetup-info">
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg"/>
      {{ organizer }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg"/>
      {{ place }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg"/>
      <time datetime="2020-01-01">{{
          new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }}
      </time>
    </li>
    </ul>`,
});
