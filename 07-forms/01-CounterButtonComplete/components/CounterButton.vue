<template>
  <button @click="increaseCounter">{{ counter }}</button>
</template>


<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      counter: 0,
    }
  },

  watch: {
    count() {
      this.counter = this.count
    }
  },

  methods: {
    increaseCounter() {
      this.$emit('update:count', ++this.counter)
    }
  },

  created() {
    this.counter = typeof this.count === 'number' ? this.count : 0
  }
};
</script>
