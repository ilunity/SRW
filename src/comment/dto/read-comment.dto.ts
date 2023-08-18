import { User } from '../../user/entity/user.entity';

export class ReadCommentDto {
  readonly id: number;
  readonly text: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly user: User;
}
