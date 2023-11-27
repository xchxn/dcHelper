import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { id:string, username: string, password: string }): Promise<any> {
    console.log('Received input value:', body.id);

    return this.userService.createUser(body.username, body.password);
  }
}
