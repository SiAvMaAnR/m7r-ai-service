import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import {
  ProfilesRepositoryCreateEntityT,
  ProfilesRepositoryGetManyArgsT,
  ProfilesRepositoryGetOneArgsT,
  ProfilesRepositoryUpdateEntityT,
} from './profiles.types';
import { PagedResponseT } from 'src/common/common.types';

@Injectable()
export class ProfilesRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getMany(
    args: ProfilesRepositoryGetManyArgsT,
  ): Promise<PagedResponseT<Profile>> {
    const { filter, orderBy, pagination } = args;
    const { pageNumber, pageSize } = pagination;

    const whereConditions: FindOptionsWhere<Profile> = {
      accountId: filter.accountId,
    };

    if (filter.searchField) {
      whereConditions.name = ILike(`%${filter.searchField}%`);
    }

    const [profiles, itemsCount] = await this.profileRepository.findAndCount({
      where: whereConditions,
      order: orderBy,
      skip: pageNumber * pageSize,
      take: pageSize,
    });

    const pagesCount = pageSize > 0 ? Math.ceil(itemsCount / pageSize) : 0;

    return {
      meta: {
        pagesCount,
        itemsCount,
        pageNumber,
        pageSize,
      },
      items: profiles,
    };
  }

  async getOne(args: ProfilesRepositoryGetOneArgsT): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy(args);

    return profile;
  }

  async create(
    accountId: number,
    entity: ProfilesRepositoryCreateEntityT,
  ): Promise<Profile> {
    const { identifiers } = await this.profileRepository.insert({
      ...entity,
      accountId,
    });

    const { id } = identifiers[0];

    return this.profileRepository.findOneBy({ id, accountId });
  }

  async update(
    accountId: number,
    id: number,
    entity: ProfilesRepositoryUpdateEntityT,
  ): Promise<Profile> {
    const { affected } = await this.profileRepository.update(
      { id, accountId },
      entity,
    );

    if (!affected) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return this.profileRepository.findOneBy({ id, accountId });
  }

  async delete(accountId: number, id: number): Promise<void> {
    const { affected } = await this.profileRepository.delete({ id, accountId });

    if (!affected) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }
}
