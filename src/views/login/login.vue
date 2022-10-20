<script setup lang="ts">
import ImageVerify from './components/ImageVerify.vue';
import { FormRules, FormInst } from 'naive-ui';
import md5 from 'md5';
const { token, refreshed, userInfo, access } = storeToRefs(useAccessStore());
const formValue = ref({
  account: 'admin',
  password: 'admin',
});
const signkey = ref();
const fromValueComputed = computed(() => {
  return {
    account: formValue.value.account,
    password: md5(formValue.value.password + signkey.value),
  };
});
//验证码校验
const inputCode = ref('');
const code = ref('');
const codeValidationStatus = computed(() => {
  if (!inputCode.value) return undefined;
  return inputCode.value === code.value ? 'success' : 'error';
});
const codeFeedback = computed(() => {
  if (!inputCode.value) return '请输入验证码';
  if (inputCode.value.length > 10) return '你看你输入多少个数了都';
  return inputCode.value === code.value
    ? '验证码对了,可以登录'
    : '验证码不对,点击图片可以换';
});
//用户密码校验
const formRef = ref<FormInst>();
const loading = ref(false);
const rules: FormRules = {
  account: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur'],
  },
};
const handleVerify = () => {
  loading.value = true;
  formRef.value?.validate((err) => {
    if (err) {
      loading.value = false;
      return window.$message.error('请输入完整内容');
    }
    if (inputCode.value === '') {
      loading.value = false;
      return window.$message.error('请输入验证码');
    }
    if (inputCode.value !== code.value) {
      loading.value = false;
      return window.$message.error('验证码错误');
    }
    handleLogin();
  });
};
const redirect = (useRoute().query.redirect as string) || '/';
const router = useRouter();
const handleLogin = async () => {
  try {
    const result = await loginApi.login(fromValueComputed.value);
    userInfo.value = result.userInfo;
    token.value = result.token;
    refreshed.value = true;
    access.value = result.access;
    router.push(redirect);
    window.$notification.success({
      title: `欢迎回来${result.userInfo.name}`,
      duration: 3000,
    });
  } catch (error) {
    loading.value = false;
  }
};
</script>
<template>
  <div wfull hfull flex-center class="bg" bg="white dark:dark">
    <div
      w90
      p10
      rounded-xl
      shadow-2xl
      flex="~ col"
      gap0
      bg=" white/80 dark:black/80"
      backdrop-blur-xl
      z-999
    >
      <div wfull flex flex-col gap1>
        <h1 text-3xl>登录</h1>
        <p text-gray>靓芙泉门店管理系统</p>
      </div>
      <n-form ref="formRef" :model="formValue" :rules="rules">
        <n-form-item path="account">
          <n-input
            v-model:value="formValue.account"
            placeholder="输入用户名"
            clearable
            @keyup.enter="handleVerify"
          />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            placeholder="输入密码"
            clearable
            show-password-on="mousedown"
            @keyup.enter="handleVerify"
          />
        </n-form-item>
        <n-form-item
          path="code"
          :validation-status="codeValidationStatus"
          :feedback="codeFeedback"
        >
          <div wfull flex items-center gap1>
            <n-input
              wfull
              v-model:value="inputCode"
              type="text"
              placeholder="输入验证码"
              :maxlength="4"
              show-count
              clearable
              @keyup.enter="handleVerify"
            />
            <image-verify v-model:code="code" />
          </div>
        </n-form-item>
        <n-form-item>
          <n-button
            :loading="loading"
            type="primary"
            block
            @click="handleVerify"
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
