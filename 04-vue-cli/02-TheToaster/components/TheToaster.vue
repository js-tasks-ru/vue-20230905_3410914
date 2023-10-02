<template>
  <div class="toasts">
    <div
      class="toast"
      :class="message.type === 'success' ? 'toast_success' : 'toast_error'"
      v-for="message in messages"
      :key="message.message">
      <UiIcon class="toast__icon" :icon="message.type === 'success' ? 'check-circle' : 'alert-circle'"/>
      <span>{{ message.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToaster',

  components: {
    UiIcon
  },

  data() {
    return {
      messages: [],
      index: 0
    }
  },

  methods: {
    success(message) {
      this.addAlert(message, 'success')
    },
    error(message) {
      this.addAlert(message, 'error')
    },
    addAlert(message, type) {
      this.messages.push({
          message,
          type,
          index: this.index
        }
      )
      let i = this.index
      setTimeout(() => this.messages = this.messages.filter((el) => el.index !== i), 5000)
      this.index++
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
