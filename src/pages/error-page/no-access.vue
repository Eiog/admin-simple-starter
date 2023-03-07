<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div wfull hfull flex-center>
    <n-result
      status="403"
      title="403 禁止访问"
      description="总有些门是对你关闭的"
      size="huge"
    >
      <template #footer>
        <n-button @click="router.push('/')">
          找点乐子吧"/"
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped lang="less"></style>
