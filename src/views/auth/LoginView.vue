<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-card class="elevation-1 pa-3">
          <v-card-title class="text-center">
            <img src="@/assets/logo.png" width="196" />
            <div>Login to Admin</div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="authStore.identify"
                label="Email or Username"
                outlined
                dense
                type="text"
                :rules="identifyRules"
              />
              <v-text-field
                v-model="authStore.password"
                label="Password"
                outlined
                dense
                type="password"
                :rules="passwordRules"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="w-75" color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const identifyRules = [(v) => !!v || 'Identify is required'];

const passwordRules = [(v) => !!v || 'Password is required'];

const login = async () => {
  const result = await authStore.login();
  if (result) router.push('/admin');
};
</script>

<style lang="scss" scoped></style>
