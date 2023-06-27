<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import type { DropdownOption } from 'naive-ui'

const route = useRoute()
const router = useRouter()
function matched2dropdown(matched: RouteLocationMatched[]) {
  const result: DropdownOption[] = []
  matched.forEach((item) => {
    const data: DropdownOption = {
      label: item.meta.title,
      key: item.path,
      icon: () => h(item.meta.icon!),
    }
    if (item.children.length > 0) {
      data.children = []
      item.children.forEach((item) => {
        data.children?.push({
          label: item.meta?.title,
          key: item.path,
          icon: () => h(item.meta!.icon!),
          props: {
            onClick: () => {
              router.push(item.path)
            },
          },
        })
      })
    }
    result.push(data)
  })
  return result
}
const breadcrumbData = ref(matched2dropdown(route.matched))
watch(
  () => route.matched,
  (newValue) => {
    breadcrumbData.value = matched2dropdown(newValue)
  },
)
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="index">
      <n-dropdown
        v-if="item.children && item.children.length > 0"
        trigger="hover"
        :options="item.children"
      >
        <div flex-center gap1 leading-none>
          <component :is="item.icon as unknown" />
          <span>{{ item.label }}</span>
          <i i-ri-arrow-down-s-line />
        </div>
      </n-dropdown>
      <div v-else flex-center gap1 leading-none>
        <component :is="item.icon as unknown" />
        <span>{{ item.label }}</span>
      </div>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped lang="less"></style>
