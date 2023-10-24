<template>
  <div class="pagination-container">
    <slot :item="item" v-for="item in paginatedItems"/>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    paginatedItems() {
      let index = (this.page - 1) * this.perPage
      return this.items.slice(index, index + this.perPage)
    }
  }
};
</script>

<style></style>
