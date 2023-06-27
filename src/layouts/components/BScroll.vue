<script setup lang="ts">
import type { BSRef } from '~/composables/useBScroll'

export interface BScrollExpose {
  bsRef: BSRef
  scrollBy: BSRef['value']['scrollBy']
  scrollTo: BSRef['value']['scrollTo']
  scrollToElement: BSRef['value']['scrollToElement']
}
const { domRef, bsRef, scrollBy, scrollTo, scrollToElement } = useBScroll()
function handleScrollStep(num: number) {
  if (!bsRef.value)
    return
  scrollBy(num, 0, 500)
}
defineExpose({
  bsRef,
  scrollBy,
  scrollTo,
  scrollToElement,
})
</script>

<template>
  <div wfull hfull flex items-center gap2>
    <div flex-center>
      <n-button quaternary circle @click="handleScrollStep(100)">
        <i text-2xl i-ri-arrow-drop-left-line />
      </n-button>
    </div>
    <div ref="domRef" flex-1 min-w-0 overflow-hidden>
      <div flex w-min gap3>
        <slot />
      </div>
    </div>
    <div flex-center>
      <n-button quaternary circle @click="handleScrollStep(-100)">
        <i text-2xl i-ri-arrow-drop-right-line />
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
