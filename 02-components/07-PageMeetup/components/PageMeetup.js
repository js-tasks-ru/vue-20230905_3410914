import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from "./MeetupView";

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      meetup: null,
      error: null,
    }
  },

  methods: {
    async updatePage() {
      try {
        this.meetup = await fetchMeetupById(this.meetupId)
      } catch (err) {
        this.error = err;
      }
    }
  },

  watch: {
    meetupId: {
      async handler() {
        this.meetup = null;
        await this.updatePage();
      },
      immediate: true
    }
  },

  template: `
    <div class="page-meetup">
    <MeetupView :meetup="meetup" v-if="meetup"/>

    <UiContainer v-if="!meetup && !error">
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer v-if="error">
      <UiAlert>{{ error.message }}</UiAlert>
    </UiContainer>
    </div>
  `,
});
