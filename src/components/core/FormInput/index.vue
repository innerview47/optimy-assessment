<script setup>
import { computed } from 'vue';
const props = defineProps({
  type: String,
  id: String,
  label: String,
  name: String,
  value: String,
  disabled: Boolean,
  modelValue: String,
  hasErrors: Boolean
});
const emit = defineEmits(['update:modelValue', 'onBlur'])

const model = computed({
  get () {
    return props.modelValue;
  },
  set (val) {
    emit('update:modelValue', val)
  }
})
</script>
<template>
    <div class="formInputWrap">
        <label
            v-if="label"
            :for="id"
        >
            {{label}}
        </label>
        <textarea
            v-if="type === 'textarea'"
            :id="id"
            :name="name"
            :class="`form-control mt-2 ${hasErrors ? 'border-danger' : ''}`"
            tabindex="0"
            cols="30" rows="10"
            v-model="model"
            @blur="(e) => emit('onBlur', e)"
        >
            {{value}}
            {{hasErrors}}
        </textarea>
        <input
            v-else
            :id="id"
            :type="type"
            :name="name"
            :disabled="disabled"
            :class="`form-control mt-2 ${hasErrors ? 'border-danger' : ''}`"
            tabindex="0"
            v-model="model"
            @blur="(e) => emit('onBlur', e)"
        >
    </div>
</template>
<style scoped>
@import './style.css';
</style>