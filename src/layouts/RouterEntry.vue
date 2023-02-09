<script setup lang="ts">
const { keepAliveRoute, excludeKeepAlive, routerShow } = storeToRefs(
  useAccessStore(),
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in">
      <keep-alive :include="keepAliveRoute" :exclude="excludeKeepAlive">
        <component
          :is="Component"
          v-if="routerShow"
          :key="Component.scopeId"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped lang="less">
.v-leave-active,
.v-enter-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from {
  transform: translateX(-30px) scale(1.01);
  opacity: 0;
}

.v-leave-to {
  transform: translateX(10px) scale(0.99);
  opacity: 0;
}
</style>
