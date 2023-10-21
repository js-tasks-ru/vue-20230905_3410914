<template>
  <div class="button-group" role="group">
    <slot/>
  </div>
</template>

<script>
import UiButtonGroupItem from "./UiButtonGroupItem";

export default {
  name: 'UiButtonGroup',

  components: {
    UiButtonGroupItem
  },

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],

  methods: {
    select(value) {
      this.$emit('update:modelValue', value)
    }
  }
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
