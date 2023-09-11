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
      result: 0,
    }
  },
  methods: {
    calculate(event) {
      if (this.leftOperand === null || this.rightOperand === null) {
        return;
      }
      if (event) {
        this.operandType = event.target.value;
      }
      let result = operations[this.operandType](this.leftOperand, this.rightOperand);
      this.result = result === Infinity ? 'Cannot divide by zero' : result;
    }
  },
  watch: {
    leftOperand() {
      this.calculate();
    },
    rightOperand() {
      this.calculate();
    },
  },
});

const app = createApp(App);
app.mount('#app');
