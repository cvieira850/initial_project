import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from "@/data/protocols/db";
import { User } from "@/infra/postgres/entities";

import { getRepository } from "typeorm";


type LoadParams = LoadAccountByEmailRepository.Params
type LoadResult = LoadAccountByEmailRepository.Result
type AddParams = AddAccountRepository.Params
type AddResult = AddAccountRepository.Result

export class PgAccountRepository implements
  LoadAccountByEmailRepository,
  AddAccountRepository,
  UpdateAccessTokenRepository
{
  async loadByEmail (params: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name,
        email: pgUser.email
      }
    }
  }

  async add (params: AddParams): Promise<AddResult> {
    const pgUserRepo = getRepository(User)
    const account = await pgUserRepo.save({
      email: params.email,
      name: params.name,
      password: params.password,
      role: 'user'
    })
    if (account) {
      return {
        id: account.id.toString(),
        name: account.name,
        email: account.email
      }
    }
  }

  async updateAccessToken (params: UpdateAccessTokenRepository.Params): Promise<UpdateAccessTokenRepository.Result> {
    const UserRepository = getRepository(User)
    const account = await UserRepository.findOne(params.id)
    if (account !== undefined) {
      account.access_token = params.accessToken
      await UserRepository.save(account)
      return {
        id: account.id.toString(),
        name: account.name,
        email: account.email,
        access_token: account.access_token
      }
    }
  }


}
