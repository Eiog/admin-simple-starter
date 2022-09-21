<script setup lang="ts">
const {
  layoutsMode,
  themePanelShow,
  layouts,
  themeColor,
  darkMode,
  useOsDark,
} = storeToRefs(useAppStore());
const { sider, header, footer } = toRefs(layouts.value);
const colorList = [
  { name: '朱砂', color: '#ff461f' },
  { name: '火红', color: '#ff2d51' },
  { name: '鹅黄', color: '#fff143' },
  { name: '蔚蓝', color: '#70f3ff' },
  { name: '石青', color: '#1685a9' },
  { name: '靛蓝', color: '#065279' },
  { name: '品红', color: '#f00056' },
  { name: '宝蓝', color: '#4b5cc4' },
  { name: '蓝灰色', color: '#a1afc9' },
  { name: '青葱', color: '#0aa344' },
  { name: '黛紫', color: '#574266' },
  { name: '乌色', color: '#725e82' },
  { name: '玄青', color: '#3d3b4f' },
  { name: '丁香色', color: '#cca4e3' },
  { name: '鸦青', color: '#424c50' },
];
const handleMoreClick = () => {
  window.$message.info('更多颜色');
};
</script>
<template>
  <n-drawer v-model:show="themePanelShow" :width="320">
    <n-drawer-content :native-scrollbar="false">
      <template #header>
        <div flex items-center gap1 cursor-default>
          <i text-xl i-ri-palette-fill></i>
          <span>主题设置</span>
        </div>
      </template>
      <div flex="~ col">
        <div wfull flex items-center justify-around>
          <div
            w20
            h20
            rounded-xl
            flex-center
            transition-colors
            cursor-pointer
            bg="hover:gray2"
            @click="layoutsMode = 'vertical'"
            :class="layoutsMode === 'vertical' ? 'bg-gray3' : ''"
          >
            <i text="5xl gray6" i-ri-layout-3-fill></i>
          </div>
          <div
            w20
            h20
            rounded-xl
            flex-center
            transition-colors
            cursor-pointer
            bg="hover:gray2"
            @click="layoutsMode = 'horizontal'"
            :class="layoutsMode === 'horizontal' ? 'bg-gray3' : ''"
          >
            <i text="5xl gray6" i-ri-layout-left-fill></i>
          </div>
        </div>
        <n-divider>主题配置</n-divider>
        <div wfull flex="~ col" gap3>
          <p>主题色</p>
          <div wfull flex="~ col" gap1>
            <div wfull grid grid-cols-8 grid-rows-2 justify-between>
              <div
                wfull
                hmin
                py1
                flex-center
                v-for="(item, index) in colorList"
                :key="index"
              >
                <div
                  w6
                  h6
                  flex-center
                  rounded-md
                  overflow-hidden
                  cursor-pointer
                  :style="{ backgroundColor: item.color }"
                  @click="themeColor.primary = item.color"
                >
                  <i
                    text="opacity-80 2xl white"
                    i-ri-check-fill
                    v-if="themeColor.primary === item.color"
                  ></i>
                </div>
              </div>
              <div wfull py1 flex-center>
                <div
                  w6
                  h6
                  flex-center
                  rounded-md
                  overflow-hidden
                  cursor-pointer
                  bg-gray3
                  @click="handleMoreClick"
                >
                  <i text="2xl dark" i-ri-more-fill></i>
                </div>
              </div>
            </div>
            <n-color-picker
              size="small"
              v-model:value="themeColor.primary"
              :show-preview="true"
            />
          </div>
          <p>主题模式</p>
          <div flex="~ col" gap3>
            <div wfull flex="~ col" gap3 p3 rounded-md bg="gray1 dark:dark5">
              <div flex items-center justify-between>
                <p>暗黑模式</p>
                <n-switch v-model:value="darkMode" />
              </div>
              <div flex items-center justify-between>
                <p>跟随系统</p>
                <n-switch v-model:value="useOsDark" />
              </div>
            </div>
          </div>
        </div>
        <n-divider>布局配置</n-divider>
        <div flex="~ col" gap3>
          <div flex="~ col" gap2>
            <p text-gray5>Header</p>
            <div wfull flex="~ col" gap3 p3 rounded-md bg="gray1 dark:dark5">
              <div flex items-center justify-between>
                <p>是否显示</p>
                <n-switch v-model:value="header.show" />
              </div>
              <div flex items-center justify-between>
                <p>是否固定</p>
                <n-switch v-model:value="header.fixed" />
              </div>
              <div flex items-center justify-between>
                <p>高度px</p>
                <n-input-number
                  w="1/2"
                  v-model:value="header.height"
                  :min="100"
                  :max="200"
                  :step="10"
                />
              </div>
            </div>
          </div>
          <div flex="~ col" gap2>
            <p text-gray5>Sider</p>
            <div wfull flex="~ col" gap3 p3 rounded-md bg="gray1 dark:dark5">
              <div flex items-center justify-between>
                <p>是否显示</p>
                <n-switch v-model:value="sider.show" />
              </div>
              <div flex items-center justify-between>
                <p>宽度px</p>
                <n-input-number
                  w="1/2"
                  v-model:value="sider.width"
                  :min="200"
                  :max="300"
                  :step="10"
                />
              </div>
              <div flex items-center justify-between>
                <p>收起宽度px</p>
                <n-input-number
                  w="1/2"
                  v-model:value="sider.collapsedWidth"
                  :min="50"
                  :max="100"
                  :step="5"
                />
              </div>
            </div>
          </div>
          <div flex="~ col" gap2>
            <p text-gray5>Footer</p>
            <div wfull flex="~ col" gap3 p3 rounded-md bg="gray1 dark:dark5">
              <div flex items-center justify-between>
                <p>是否显示</p>
                <n-switch v-model:value="footer.show" />
              </div>
              <div flex items-center justify-between>
                <p>是否固定</p>
                <n-switch v-model:value="footer.fixed" />
              </div>
              <div flex items-center justify-between>
                <p>高度px</p>
                <n-input-number
                  w="1/2"
                  v-model:value="footer.height"
                  :min="60"
                  :max="200"
                  :step="10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<style scoped lang="less"></style>
