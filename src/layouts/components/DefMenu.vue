<script setup lang="ts">
const { sideCollapsed, layoutOption, darkMode } = storeToRefs(useAppStore())
const { authMenu } = storeToRefs(useAccessStore())
const route = useRoute()
const path = ref(route.path)
const router = useRouter()
function handleClick(key: string) {
  router.push(key)
}
watch(
  () => route.path,
  (newPath) => {
    path.value = newPath
  },
)
</script>

<template>
  <div flex-1 min-h-0>
    <n-scrollbar>
      <n-menu
        :collapsed="sideCollapsed"
        :collapsed-width="layoutOption.sider.collapsedWidth"
        :collapsed-icon-size="26"
        :inverted="darkMode"
        :indent="24"
        mode="vertical"
        :options="authMenu"
        :value="path"
        @update:value="handleClick"
      />
    </n-scrollbar>
  </div>
</template>

<style scoped lang="less"></style>
