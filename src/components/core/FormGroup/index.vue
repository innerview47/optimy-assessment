<script setup>
const props = defineProps({
  hasErrors: Boolean,
  message: String
})
</script>
<template>
  <div class="form-group">
    <slot></slot>
    <small
      v-show="message"
      :class="`${hasErrors ? 'text-danger' : ''}`"
    >
      {{message}}
    </small>
  </div>
</template>
