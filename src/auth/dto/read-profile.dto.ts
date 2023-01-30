import { USER_ROLE } from '../../user/entity/user-roles';

export class ReadProfileDto {
  id: number;
  username: string;
  avatar: string;
  role: USER_ROLE;
}
