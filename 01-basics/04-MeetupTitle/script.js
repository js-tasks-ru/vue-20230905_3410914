import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = defineComponent({
  name: 'App',
  data() {
    return {
      meetupId: null,
      meetupTitle: null,
    }
  },
  watch: {
    async meetupId(id) {
      let meetup = await fetchMeetupById(id);
      this.meetupTitle = meetup.title;
    }
  }
});

const app = createApp(App);
app.mount('#app');
