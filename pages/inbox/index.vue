<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="fill-height">
          <v-card-title> Inbox </v-card-title>
          <v-list lines="two">
            <v-list-item
              :class="{
                'bg-primary': inboxStore.selectedUser?.id === conv.user.id,
              }"
              v-for="conv in inboxStore.conversations"
              :key="conv.user.id"
              :title="conv.user.full_name"
              :prepend-avatar="
                conv.user.avatar ||
                'https://cdn.vuetifyjs.com/images/lists/1.jpg'
              "
              @click="onSelectUser(conv.user)"
            >
              <template #subtitle>
                <div v-html="conv.last_message"></div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="auto" class="flex-grow-1">
        <v-card v-if="inboxStore.selectedUser">
          <v-card-title>
            <div class="border-b-sm">
              {{ inboxStore.selectedUser?.full_name }}
            </div>
          </v-card-title>
          <v-card-text
            class="flex-grow-1 overflow-y-auto"
            style="height: 500px"
            v-if="inboxStore.selectedUser"
          >
            <div
              v-for="msg in inboxStore.selectedUserMessages"
              :key="msg.id"
              :class="{ 'd-flex flex-row-reverse': isSelf(msg) }"
            >
              <v-avatar
                v-if="msg.sender_id === inboxStore.selectedUser.id"
                class="me-2 mb-5"
              >
                <v-img
                  :src="
                    inboxStore.selectedUser.avatar ||
                    'https://cdn.vuetifyjs.com/images/john.jpg'
                  "
                ></v-img>
              </v-avatar>
              <v-chip
                :color="!isSelf(msg) ? 'primary' : ''"
                dark
                style="height: auto; white-space: normal"
                class="pa-4 mb-2"
              >
                {{ msg.content }}
              </v-chip>
            </div>
          </v-card-text>
          <v-text-field
            class="px-3 py-2"
            v-model="inputContent"
            label="Type a message"
            type="text"
            no-details
            outlined
            @keyup.enter="onSend"
            @click:append="onSend"
            hide-details
          >
            <template #append>
              <v-icon icon="mdi-send" @click="onSend"> </v-icon>
            </template>
          </v-text-field>
        </v-card>
        <v-card v-else :height="600">
          <v-card-title>
            {{ 'Select a user to start chatting' }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';

useHead({
  title: 'Inbox',
});

const inboxStore = useInboxStore();
const inputContent = ref('');

onMounted(() => {
  inboxStore.fetchConversations();
});

const onSelectUser = async (user) => {
  if (inboxStore.selectedUser?.id === user.id) return;
  inboxStore.selectedUser = user;
  inboxStore.getConnection();
  await inboxStore.fetchMessages(inboxStore.selectedUser.id);
};

const onSend = () => {
  inboxStore.connection.send(
    JSON.stringify({
      content: inputContent.value,
      receiver: inboxStore.selectedUser.id,
    }),
  );
  inputContent.value = '';
};

const isSelf = (msg) => {
  return msg.sender !== inboxStore.selectedUser.id;
};
</script>

<style lang="scss" scoped></style>
