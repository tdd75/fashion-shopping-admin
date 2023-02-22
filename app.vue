<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- Dialog  -->
  <v-dialog v-model="appStore.dialog.show" max-width="400px">
    <v-card class="px-1 py-2">
      <v-card-title :class="`text-${appStore.dialog.type}`">
        {{ appStore.dialog.title }}
      </v-card-title>
      <v-card-text> {{ appStore.dialog.content }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="appStore.dialog.type"
          variant="flat"
          @click="
            () => {
              appStore.dialog.onConfirm();
              appStore.dialog.show = false;
            }
          "
        >
          {{ appStore.dialog.confirmText }}
        </v-btn>
        <v-btn text @click="appStore.dialog.show = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Snackbar  -->
  <v-snackbar
    v-model="appStore.snackbar.show"
    :timeout="2000"
    top
    :color="appStore.snackbar.type"
  >
    <span>{{ appStore.snackbar.message }}</span>
    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        class="font-weight-bold"
        @click="appStore.snackbar.show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { NotifyType } from '@/shared/enums';

const appStore = useAppStore();
</script>
