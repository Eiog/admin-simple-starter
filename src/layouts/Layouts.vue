<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed, toRefs, withDefaults } from 'vue'

interface Props {
  mode?: 'vertical' | 'horizontal'
  collapsed?: boolean
  sider?: {
    show: boolean
    width: number
    collapsedWidth: number
  }
  header?: {
    show: boolean
    fixed: boolean
    height: number
  }
  footer?: {
    show: boolean
    fixed: boolean
    height: number
  }
  main?: {
    contentStyle: StyleValue
  }
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  collapsed: false,
  sider() {
    return {
      show: true,
      width: 200,
      collapsedWidth: 60,
    }
  },
  header() {
    return {
      show: true,
      fixed: true,
      height: 60,
    }
  },
  footer() {
    return {
      show: true,
      fixed: true,
      height: 60,
    }
  },
  main() {
    return {
      contentStyle: {},
    }
  },
})
const { mode, collapsed, header, footer, sider, main } = toRefs(props)
const layoutStyle: StyleValue = {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  transition: 'all .3s',
}
const headerStyle = computed(() => {
  const style: StyleValue = {
    width: '100%',
    transition: 'all .5s',
    zIndex: 1,
    flexShrink: 0,
    minHeight: 0,
  }
  if (mode?.value === 'vertical') {
    style.paddingLeft = 0
    style.zIndex = 2
  }
  if (mode?.value === 'horizontal') {
    style.paddingLeft = sider.value.show
      ? collapsed?.value
        ? `${sider?.value?.collapsedWidth}px`
        : `${sider?.value?.width}px`
      : 0
  }
  style.height = `${header?.value?.height}px`
  if (header?.value?.fixed) {
    style.position = 'fixed'
    style.top = 0
    style.left = 0
  }
  if (!header?.value?.fixed)
    style.position = 'relative'

  return style
})
const sideStyle = computed(() => {
  const style: StyleValue = {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    transition: 'all .3s',
  }
  style.width = collapsed?.value
    ? `${sider?.value?.collapsedWidth}px`
    : `${sider?.value?.width}px`
  if (mode?.value === 'vertical') {
    style.paddingTop = header.value.show
      ? header.value.fixed
        ? `${header?.value?.height}px`
        : 0
      : 0
    style.paddingBottom = footer.value.show
      ? footer.value.fixed
        ? `${footer?.value?.height}px`
        : 0
      : 0
    style.zIndex = 1
  }
  if (mode?.value === 'horizontal') {
    style.paddingTop = 0
    style.paddingBottom = 0
  }
  return style
})
const mainStyle = computed(() => {
  const style: StyleValue = {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 0,
    transition: 'all .3s',
  }
  style.paddingLeft = sider.value.show
    ? collapsed?.value
      ? `${sider?.value?.collapsedWidth}px`
      : `${sider?.value?.width}px`
    : 0
  style.paddingTop
    = (header?.value?.fixed && header?.value?.show)
      ? `${header?.value.height}px`
      : '0'
  style.paddingBottom
    = (footer?.value?.fixed && footer?.value?.show)
      ? `${footer?.value.height}px`
      : '0'

  return style
})
const footerStyle = computed(() => {
  const style: StyleValue = {
    width: '100%',
    zIndex: 1,
    flexShrink: 0,
    minHeight: 0,
    transition: 'all .5s',
  }
  style.width = '100%'
  style.height = `${footer?.value?.height}px`
  if (mode?.value === 'vertical')
    style.paddingLeft = 0

  if (mode?.value === 'horizontal') {
    style.paddingLeft = sider.value.show
      ? collapsed?.value
        ? `${sider?.value?.collapsedWidth}px`
        : `${sider?.value?.width}px`
      : 0
  }
  if (footer?.value?.fixed) {
    style.position = 'fixed'
    style.left = 0
    style.bottom = 0
  }
  if (!footer?.value?.fixed)
    style.position = 'relative'

  return style
})
</script>

<template>
  <div class="xsr-layout" :style="[layoutStyle]">
    <div v-if="header.show" class="xsr-layout-header" :style="headerStyle">
      <slot name="header" />
    </div>
    <aside v-if="sider.show" class="xsr-layout-sider" :style="sideStyle">
      <slot name="sider" />
    </aside>
    <main class="xsr-layout-main" :style="mainStyle">
      <div :style="main.contentStyle">
        <slot name="main" />
        <slot />
      </div>
    </main>
    <footer v-if="footer.show" class="xsr-layout-footer" :style="footerStyle">
      <slot name="footer" />
    </footer>
  </div>
</template>
