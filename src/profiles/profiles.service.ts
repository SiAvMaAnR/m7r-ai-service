import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { AccContextService } from '../common/providers/user-context.service';
import { Service } from 'src/common/providers/base.service';
import { modelMapper } from 'src/ai-core/integrations/ai-client.model-mapper';
import { ProfilesRepository } from './profiles.repository';
import { PagedResponseT } from 'src/common/common.types';
import { GetProfilesArgsT } from './profiles.types';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService extends Service {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
    accContextService: AccContextService,
  ) {
    super(accContextService);
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = await this.profilesRepository.create(this.accountId, {
      ...createProfileDto,
      integration: modelMapper[createProfileDto.model],
    });

    return profile;
  }

  async deleteProfile(id: number): Promise<void> {
    await this.profilesRepository.delete(this.accountId, id);
  }

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profilesRepository.update(this.accountId, id, {
      ...updateProfileDto,
      integration: modelMapper[updateProfileDto.model],
    });

    return profile;
  }

  async getProfiles(args: GetProfilesArgsT): Promise<PagedResponseT<Profile>> {
    const { pageNumber, pageSize, searchField } = args;

    const profiles = await this.profilesRepository.getMany({
      filter: {
        accountId: this.accountId,
        searchField,
      },
      orderBy: { id: 1 },
      pagination: { pageNumber, pageSize },
    });

    return profiles;
  }

  async getProfile(id: number) {
    const profile = await this.profilesRepository.getOne({
      id,
      accountId: this.accountId,
    });

    return profile;
  }
}
