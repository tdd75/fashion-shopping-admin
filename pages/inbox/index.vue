<template>
  <v-container>
    <v-row>
      <v-col>
        <v-responsive class="overflow-y-auto fill-height" height="500">
          <v-card>
            <v-list lines="two">
              <v-list-item
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
        </v-responsive>
      </v-col>
      <v-col cols="auto" class="flex-grow-1">
        <v-card>
          <v-card-title>
            {{ inboxStore.selectedUser?.full_name }}
          </v-card-title>
          <v-card-text class="flex-grow-1 overflow-y-auto">
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
          <v-card-text class="flex-shrink-1">
            <v-text-field
              v-model="inputContent"
              label="Type a message"
              type="text"
              no-details
              outlined
              append-icon="mdi-send"
              @keyup.enter="onSend"
              @click:append="onSend"
              hide-details
            />
          </v-card-text>
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
