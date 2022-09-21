<script setup lang="ts"></script>
<template>
  <div px3 w80 h100>
    <n-tabs type="line" animated justify-content="space-around">
      <n-tab-pane name="message" tab="消息">
        <n-scrollbar>
          <div flex="~ col" gap2>
            <div
              wfull
              flex
              items-center
              gap3
              p1
              transition-colors
              rounded-md
              cursor-pointer
              bg="white hover:gray1 dark:(dark3 hover:dark6)"
            >
              <n-avatar round size="large" />
              <div flex="~ col 1" min-w-0>
                <div flex items-center justify-between>
                  <p text="lg gray8 dark:gray">打工仔</p>
                  <n-time text-xs :time="Date.now()" format="yyyy-MM-dd" />
                </div>
                <p text-gray5 truncate>毫无疑问，你是办公室里最亮的星</p>
              </div>
            </div>
          </div>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="task" tab="任务"> 任务 </n-tab-pane>
    </n-tabs>
  </div>
</template>
<style scoped lang="less"></style>
