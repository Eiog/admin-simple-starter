<script setup lang="ts" name="VerifyCode">
interface Props {
  code?: string
  width?: number
  height?: number
}
interface Emit {
  (e: 'update:code', code: string): string
}
const props = withDefaults(defineProps<Props>(), {
  code: '',
  width: 120,
  height: 32,
})
const emit = defineEmits<Emit>()
const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify(
  props.width,
  props.height,
)
watch(
  () => props.code,
  (val) => {
    if (val)
      setImgCode(val)
  },
)
watch(imgCode, (val) => {
  emit('update:code', val)
})
defineExpose({ getImgCode })
</script>

<template>
  <canvas
    ref="domRef"
    :width="props.width"
    :height="props.height"
    @click="getImgCode"
  />
</template>

  <style scoped lang="less"></style>
