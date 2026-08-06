import { PaginationT } from 'src/common/common.types';
import { Profile } from './entities/profile.entity';
import { FindOptionsOrder } from 'typeorm';

export type ProfilesRepositoryGetManyArgsT = {
  filter: {
    accountId: number;
    searchField: string;
  };
  orderBy: FindOptionsOrder<Profile>;
  pagination: PaginationT;
};

export type ProfilesRepositoryGetOneArgsT = {
  id: number;
  accountId: number;
};

export type ProfilesRepositoryCreateEntityT = Omit<
  Partial<Profile>,
  'id' | 'accountId'
>;

export type ProfilesRepositoryUpdateEntityT = Omit<
  Partial<Profile>,
  'id' | 'accountId'
>;

export type GetProfilesArgsT = PaginationT & {
  searchField?: string;
};
