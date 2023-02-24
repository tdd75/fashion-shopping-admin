import { Login } from '@/shared/interfaces/request/Login';
import { Conversation } from '@/shared/interfaces/response/Conversation';
import { ListResponse } from '@/shared/interfaces/response/ListResponse';
import { Message } from '@/shared/interfaces/response/Message';
import { tokenStorage } from '@/shared/utils/storage';

interface InboxState {
  conversations: any;
  selectedUser: any;
  messages: any;
  connection: any;
}

export const useInboxStore = defineStore('inbox', {
  state: (): InboxState => ({
    conversations: true,
    selectedUser: null,
    messages: {},
    connection: null,
  }),
  getters: {
    selectedUserMessages(): any {
      return this.messages[this.selectedUser?.id];
    },
  },
  actions: {
    async fetchConversations() {
      const { data, error } = await useFetch<ListResponse<Conversation>>(
        '/chat/admin/conversations/',
        {
          ...useFetchOptions(),
        },
      );
      if (!error.value) {
        this.conversations = data.value?.results;
      }
    },
    async fetchMessages(userId: number) {
      const { data, error } = await useFetch<ListResponse<Message>>(
        `/chat/admin/conversations/${userId}/`,
        {
          ...useFetchOptions(),
          params: {
            expand: 'sender,receiver',
          },
        },
      );
      if (!error.value) {
        this.messages[userId] = data.value?.results;
      }
    },
    getConnection() {
      const config = useRuntimeConfig();
      const access = tokenStorage.value.access;
      this.connection?.close();
      this.connection = new WebSocket(
        `${config.public.wsURL}/msg/?token=${access}&receiver=${this.selectedUser.id}`,
      );
      this.connection.onmessage = (event: MessageEvent) => {
        const newMessage = JSON.parse(event.data);
        this.messages[this.selectedUser.id].push(newMessage);
      };
      this.connection.onopen = (event: Event) => {
        console.log(event);
      };
    },
  },
});
