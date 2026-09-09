import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { ApiTags } from '@nestjs/swagger';
import { GetProfilesArgsT } from './profiles.types';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AccountGuard } from 'src/common/guards/account.guard';

@Controller('api/profiles')
@ApiTags('Profiles')
@UseGuards(AccountGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.getProfile(id);
  }

  @Get()
  async getProfiles(@Query() args: GetProfilesArgsT) {
    return this.profilesService.getProfiles(args);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  async deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.deleteProfile(id);
  }
}
