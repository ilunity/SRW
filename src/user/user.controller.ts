import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto';
import { ReadUserCommentDto } from '../comment/dto';
import { CommentService } from '../comment/comment.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { USER_ROLE } from './entity/user-roles';
import { isAllowedRole, userRoleErrorHandler } from '../utils';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService, private commentService: CommentService) {}

  /** Returns list of all users */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Promise<User[]> {
    userRoleErrorHandler(req.user, [USER_ROLE.ADMIN]);
    return this.userService.findAll();
  }

  /** Returns the user by PK */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id')
  findOne(@Request() req, @Param('user_id') userId: number): Promise<User> {
    if (!isAllowedRole(req.user.role, [USER_ROLE.ADMIN]) && req.user.id !== userId) {
      throw new ForbiddenException('Недостаточно полномочий');
    }

    return this.userService.findOne(userId);
  }

  /** Updates the user */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(req.user.id, updateUserDto);
  }

  /** Updates the user role */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('role')
  updateRole(@Request() req, @Body() updateUserRole: UpdateUserRoleDto): Promise<User> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);

    return this.userService.updateRole(updateUserRole);
  }

  // ---------- comments ----------

  /** Returns user comments */
  @Get(':user_id/comment')
  findComments(@Param('user_id') userId: number): Promise<ReadUserCommentDto[]> {
    return this.commentService.findAllByUser(userId);
  }

  /** Removes user comment. Works for your own comment and for user with ADMIN role */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/comment/:comment_id')
  removeComment(@Request() req, @Param('comment_id') commentId: number) {
    this.commentService.remove(req.user, commentId);
  }
}
