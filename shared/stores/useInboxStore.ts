import { Login } from '@/shared/interfaces/request/Login';
import { ListResponse } from '@/shared/interfaces/response/ListResponse';

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
      const { data, error } = await useFetch<Login>(
        '/chat/admin/conversations/',
        {
          ...useFetchOptions(),
        },
      );
      if (!error.value) {
        this.conversations = data.value?.indentify;
      }
    },
    async fetchMessages(userId: number) {
      const { data, error } = await useFetch<ListResponse<Login>>(
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
      this.connection?.close();
      this.connection = new WebSocket(
        `${import.meta.env.VITE_WS_URL}/msg/?token=${localStorage.getItem(
          'access',
        )}&receiver=${this.selectedUser.id}`,
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
