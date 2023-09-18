<template>
  <div class="toasts">
    <div class="toast toast_success" v-for="message in successMessages" :key="message.message">
      <UiIcon class="toast__icon" icon="check-circle"/>
      <span>{{ message.message }}</span>
    </div>

    <div class="toast toast_error" v-for="message in errorMessages" :key="message.message">
      <UiIcon class="toast__icon" icon="alert-circle"/>
      <span>{{ message.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToaster',

  components: {UiIcon},
  data() {
    return {
      successMessages: [],
      errorMessages: [],
    }
  },
  mounted() {
    setInterval(() => {
      this.filterMessages()
    }, 100)
  },
  methods: {
    success(message) {
      this.successMessages.push({
          message, time: Date.now()
        }
      )
    },
    error(message) {
      this.errorMessages.push({
        message, time: Date.now()
      })
    },
    show(message) {
      return Date.now() - message.time < 5000
    },
    filterMessages() {
      this.successMessages = this.successMessages.filter((message) => this.show(message))
      this.errorMessages = this.errorMessages.filter((message) => this.show(message))
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
  margin-top: 20px;;
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
