<template>
  <v-app-bar>
    <v-row justify="space-between" class="px-6">
      <v-btn
        icon="mdi-menu"
        @click="() => (appStore.toggleDrawer = !appStore.toggleDrawer)"
      >
      </v-btn>
      <v-menu rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar>
              <v-img
                :src="
                  userStore.me?.avatar ||
                  'https://cdn.vuetifyjs.com/images/john.jpg'
                "
                alt="John"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <h3>{{ userStore.me?.full_name || '' }}</h3>
              <p class="text-caption mt-1">
                {{ userStore.me?.email || '' }}
              </p>
              <v-divider class="my-1"></v-divider>
              <v-btn rounded>Edit Account</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn rounded @click="triggerLogout">Logout</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-app-bar>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  userStore.getInfo();
});
const triggerLogout = () => {
  const result = authStore.logout();
  if (result) {
    router.push('/admin/auth/login');
  }
};
</script>
