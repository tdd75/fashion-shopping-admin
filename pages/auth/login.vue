<template>
  <v-app>
    <v-container fluid class="d-flex align-center h-100">
      <v-row justify="center">
        <v-col cols="4">
          <v-card class="elevation-1 pa-3">
            <v-card-title class="text-center">
              <img src="@/assets/logo.png" width="128" />
              <h3>Fashion Shopping App</h3>
              <div class="mb-3 text-h6 text-grey-darken-2">Login to Admin</div>
            </v-card-title>
            <v-card-text class="text-center">
              <v-form>
                <v-text-field
                  class="mb-2"
                  v-model="authStore.loginForm.identify"
                  label="Email or Username"
                  type="text"
                  variant="outlined"
                  :rules="identifyRules"
                />
                <v-text-field
                  v-model="authStore.loginForm.password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  :rules="passwordRules"
                />
              </v-form>
              <v-btn
                class="w-100 mt-5"
                color="primary"
                variant="flat"
                @click="login"
                >Login</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ROUTE_NAME } from '@/routes';
import { NotifyType } from '@/shared/enums';

useHead({
  title: 'Login',
});
definePageMeta({
  layout: false,
});

const identifyRules = [(v) => !!v || 'Identify is required'];
const passwordRules = [(v) => !!v || 'Password is required'];

const authStore = useAuthStore();

const login = async () => {
  const result = await authStore.login();
  if (result) {
    navigateTo({
      name: ROUTE_NAME.HOME,
    });
  } else {
    showSnackbar(NotifyType.ERROR, 'Login failed');
  }
};
</script>

<style lang="scss" scoped></style>
