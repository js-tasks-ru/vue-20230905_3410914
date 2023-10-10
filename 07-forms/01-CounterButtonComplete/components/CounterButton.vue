<template>
  <button @click="increaseCounter">{{ count || counter }}</button>
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

  methods: {
    increaseCounter() {
      this.counter++
      this.$emit('update:count', this.counter)
    }
  },

  mounted() {
    this.counter = this.count
  }
};
</script>
