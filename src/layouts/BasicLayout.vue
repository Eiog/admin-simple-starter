<script setup lang='ts'>
const { darkMode, naiveThemeOverrides, naiveLocale, naiveDateLocale }
  = storeToRefs(useAppStore())
</script>

<template>
  <naive-provider
    :dark="darkMode"
    :theme-overrides="naiveThemeOverrides"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
  >
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </naive-provider>
</template>

<style scoped lang='less'>

</style>
