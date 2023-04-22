<script setup lang='ts'>
const { layoutOption, sideCollapsed, useDarkMode } = storeToRefs(useAppStore())
</script>

<template>
  <div w-full h-full flex-x-center p5>
    <div w-1600px h-full flex rounded-2xl shadow="2xl black/30" bg="white dark:black/90" overflow-hidden border="black/10">
      <aside h-full flex flex-col transition-all :class="useDarkMode ? 'aside-dark' : 'aside'" :style="{ width: `${sideCollapsed ? layoutOption.sider.collapsedWidth : layoutOption.sider.width}px` }">
        <DefBrand />
        <DefMenu />
        <ToggleAside />
      </aside>
      <div flex-1 flex flex-col>
        <DefHeader />
        <DefTabs />
        <main flex-1 min-h-0 overflow-hidden>
          <RouterEntry />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.aside{
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}
.aside-dark{
  background-image: linear-gradient(to top, #2d185e 0%, #340d4b 100%);
}
</style>
