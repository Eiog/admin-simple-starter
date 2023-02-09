<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div wfull hfull flex-center>
    <n-result
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
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
