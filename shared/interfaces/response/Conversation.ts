import { CustomUser } from '@/shared/interfaces/response/CustomUser';

export interface Conversation {
  last_message: string;
  user: CustomUser;
}
