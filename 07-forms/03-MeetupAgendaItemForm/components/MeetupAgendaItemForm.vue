<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="remove">
      <UiIcon icon="trash"/>
    </button>
    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="type"/>
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" name="startsAt" v-model="startsAt"/>
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" v-model="endsAt"/>
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup label="Тема" v-if="isTalk">
      <UiInput name="title" v-model="title"/>
    </UiFormGroup>
    <UiFormGroup label="Докладчик" v-if="isTalk">
      <UiInput name="speaker" v-model="speaker"/>
    </UiFormGroup>
    <UiFormGroup label="Заголовок" v-if="isOther">
      <UiInput name="title" v-model="title"/>
    </UiFormGroup>
    <UiFormGroup label="Описание" v-if="isTalk || isOther">
      <UiInput multiline name="description" v-model="description"/>
    </UiFormGroup>
    <UiFormGroup label="Язык" v-if="isTalk">
      <UiDropdown title="Язык" :options="$options.talkLanguageOptions" name="language" v-model="language"/>
    </UiFormGroup>
    <UiFormGroup label="Нестандартный текст (необязательно)" v-if="!isTalk && !isOther">
      <UiInput name="title" v-model="title"/>
    </UiFormGroup>
  </fieldset>
</template>


<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      title: null,
      speaker: null,
      description: null,
      language: null,
      type: undefined,
      startsAt: null,
      endsAt: null,
      localAgendaItem: null,
    }
  },

  methods: {
    updateAgendaItem(key, value) {
      this.localAgendaItem[key] = value
      this.$emit('update:agendaItem', this.localAgendaItem)
    },

    remove() {
      this.$emit('remove')
    },
  },

  computed: {
    isTalk() {
      return this.type === 'talk'
    },
    isOther() {
      return this.type === 'other'
    },
  },

  watch: {
    type(value) {
      this.updateAgendaItem('type', value)
    },

    startsAt(value) {
      let [h, m] = this.localAgendaItem.startsAt.split(':').map((el) => parseInt(el))
      let startsAtMinutes = h * 60 + m;
      [h, m] = this.localAgendaItem.endsAt.split(':').map((el) => parseInt(el))
      let endsAtMinutes = h * 60 + m;
      [h, m] = value.split(':').map((el) => parseInt(el))
      let startsAtNowMinutes = h * 60 + m
      let delta = endsAtMinutes - startsAtMinutes
      endsAtMinutes = startsAtNowMinutes + delta
      h = ~~(endsAtMinutes / 60)
      m = endsAtMinutes - (h * 60)
      h = h >= 24 ? h - 24 : h
      this.endsAt = `0${h}`.slice(-2) + ':' + `0${m}`.slice(-2)
      this.updateAgendaItem('startsAt', value)
      this.updateAgendaItem('endsAt', this.endsAt)
    },

    endsAt(value) {
      this.updateAgendaItem('endsAt', value)
    },

    title(value) {
      this.updateAgendaItem('title', value)
    },

    speaker(value) {
      this.updateAgendaItem('speaker', value)
    },

    description(value) {
      this.updateAgendaItem('description', value)
    },

    language(value) {
      this.updateAgendaItem('language', value)
    },
  },

  mounted() {
    this.localAgendaItem = JSON.parse(JSON.stringify(this.agendaItem))
    this.type = this.localAgendaItem.type
    this.title = this.localAgendaItem.title
    this.description = this.localAgendaItem.description
    this.language = this.localAgendaItem.language
    this.speaker = this.localAgendaItem.speaker
    this.startsAt = this.localAgendaItem.startsAt
    this.endsAt = this.localAgendaItem.endsAt
  }
};
</script>


<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
