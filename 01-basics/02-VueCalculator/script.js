import {createApp, defineComponent} from './vendor/vue.esm-browser.js';

const operations = {
  sum: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

const App = defineComponent({
  name: 'App',
  data() {
    return {
      leftOperand: null,
      rightOperand: null,
      operandType: 'sum',
    }
  },
  computed: {
    result() {
      if (this.leftOperand === null || this.rightOperand === null) {
        return 0;
      }
      let r = operations[this.operandType](this.leftOperand, this.rightOperand);
      return r === Infinity ? 'Cannot divide by zero' : r;
    }
  }
});

const app = createApp(App);
app.mount('#app');
