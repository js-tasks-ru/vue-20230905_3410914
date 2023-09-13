import {defineComponent} from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: {
      options: {
        type: Number,
        required: true,
      }
    },
  },
  emits: ['update:count'],
  template: `
    <button type="button" @click="$emit('update:count')">{{ count }}</button>`,
});
