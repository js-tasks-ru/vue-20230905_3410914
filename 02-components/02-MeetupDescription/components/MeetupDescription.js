import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  props: {
    description: {
      options: {
        type: String,
        required: false,
      }
    }
  },
  template: `<p class="meetup-description">{{ description }}</p>`,
});
