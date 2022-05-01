import { LoadAccountByTokenRepository, AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from "@/data/protocols/db";
import { User } from "@/infra/postgres/entities";
import { PgConnection } from "@/infra/postgres/helpers";
import { PgRepository } from "./repository";

type LoadParams = LoadAccountByEmailRepository.Params
type LoadResult = LoadAccountByEmailRepository.Result
type AddParams = AddAccountRepository.Params
type AddResult = AddAccountRepository.Result

export class PgAccountRepository extends PgRepository implements
  LoadAccountByEmailRepository,
  AddAccountRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository
{

  async loadByEmail (params: LoadParams): Promise<LoadResult> {
    const pgUserRepo = this.getRepository(User)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name,
        email: pgUser.email,
        password: pgUser.password,
      }
    }
  }

  async add (params: AddParams): Promise<AddResult> {
    const pgUserRepo = this.getRepository(User)
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
    const UserRepository = this.getRepository(User)
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

  async loadByToken (params: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result> {
    const pgUserRepo = this.getRepository(User)
    const pgUser = await pgUserRepo.findOne({ access_token: params.accessToken })
    if (pgUser !== undefined) {
      if (params.role) {
        if (pgUser.role === params.role || (pgUser.role === 'admin' && params.role === 'user') || (pgUser.role === 'sysAdmin')) {
          return {
            id: pgUser.id.toString(),
            name: pgUser.name,
            email: pgUser.email,
            password: pgUser.password,
            role: pgUser.role,
            access_token: pgUser.access_token
          }
        }
      } else {
        return {
          id: pgUser.id.toString(),
          name: pgUser.name,
          email: pgUser.email,
          password: pgUser.password,
          role: pgUser.role,
          access_token: pgUser.access_token
        }
      }
    }
    return undefined
  }


}
