<script setup lang="ts">
const { t } = useI18n()
onDeactivated(() => {
  onActivated(() => {})
})
</script>

<template>
  <default-card h-209 title="分析页">
    <div wfull h-full flex-col-center gap-10 rounded-xl bg="white dark:dark">
      <h1 text-3xl>
        {{ t('welcome') }}
      </h1>
      <div class="flex-center gap-1">
        <NButton v-use-track:exposure>
          ExposureTrack
        </NButton>
        <NButton v-use-track:click>
          ClickTrack
        </NButton>
        <NButton v-use-track:long-press>
          LongPressTrack
        </NButton>
      </div>
    </div>
  </default-card>
</template>

<style scoped lang="less"></style>
