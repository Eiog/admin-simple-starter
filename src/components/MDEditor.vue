<script setup lang='ts'>
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import type { ExposeParam } from 'md-editor-v3'

const props = defineProps<{
  value?: string
  dark?: boolean
  previewOnly?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:value', value: typeof props.value): void
}>()
const _value = ref(props.value)
const mdRef = ref<ExposeParam>()
function onChange(value?: string) {
  _value.value = value
  emit('update:value', value)
}
watch(() => props.value, (v) => {
  _value.value = v
})
</script>

<template>
  <MdEditor
    ref="mdRef"
    :model-value="_value"
    :preview-only="props.previewOnly"
    :theme="props.dark ? 'dark' : 'light'"
    @change="onChange"
  />
</template>

<style scoped lang='less'>

</style>
