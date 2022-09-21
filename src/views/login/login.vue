<script setup lang="ts">
const { token, refreshed } = storeToRefs(useAccessStore());
const formValue = ref({
  account: 'admin',
  password: 'admin',
});
const loading = ref(false);
const rules = {};
const redirect = (useRoute().query.redirect as string) || '/';
const router = useRouter();
const handleLogin = () => {
  loading.value = true;
  mockLogin().then(() => {
    loading.value = false;
    token.value = 'token';
    refreshed.value = true;
    window.$notification.success({ title: '欢迎回来', duration: 3000 });
    router.push(redirect);
  });
};
const mockLogin = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(true);
    }, 3000);
  });
};
</script>
<template>
  <div wfull hfull flex-center class="bg">
    <div
      w90
      h100
      p10
      rounded-xl
      shadow-2xl
      flex="~ col"
      gap5
      bg="white dark:black"
      backdrop-filter="blur-xl"
    >
      <h1 text-3xl>登录</h1>
      <n-form ref="formRef" :model="formValue" :rules="rules">
        <n-form-item path="user.name">
          <n-input v-model:value="formValue.account" placeholder="输入用户名" />
        </n-form-item>
        <n-form-item path="user.password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            placeholder="输入密码"
          />
        </n-form-item>
        <n-form-item>
          <n-button :loading="loading" type="primary" block @click="handleLogin"
            >登录</n-button
          >
        </n-form-item>
      </n-form>
    </div>
    <div class="loading-bar"></div>
  </div>
</template>
<style scoped lang="less">
.bg {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
.mouse-gradient {
  background: repeating-linear-gradient(
    to right,
    #0047e1 0%,
    #34cdfe 50%,
    #00dc82 100%
  );
  filter: blur(100px);
  opacity: 0.5;
}
.loading-bar {
  background: repeating-linear-gradient(
    to right,
    #0047e1 0%,
    #34cdfe 25%,
    #00dc82 50%,
    #36e4da 75%,
    #0047e1 100%
  );
  height: 100px;
  background-size: 200% auto;
  background-position: 0 0;
  animation: gradient 2s infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  filter: blur(100px);
  position: fixed;
  bottom: -50px;
  left: -50px;
  right: -50px;
}
@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
