<script setup lang="ts">
const { keepAliveRoute } = storeToRefs(useAccessStore());
</script>
<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition mode="out-in">
        <keep-alive :include="keepAliveRoute">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>
<style scoped lang="less">
.v-leave-active,
.v-enter-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from {
  transform: translateX(-10px) scale(0.98);
  opacity: 0;
}

.v-leave-to {
  transform: translateX(10px) scale(1.02);
  opacity: 0;
}
</style>
