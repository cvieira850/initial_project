import { LoadAccountByTokenRepository, AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByIdRepository, UpdateAccountRoleRepository, UpdateResetPasswordTokenRepository, UpdatePasswordRepository, LoadAccountByResetTokenRepository } from '@/data/protocols/db'
import { User, Role } from '@/infra/pg/entities'
import { PgRepository } from './repository'

type LoadParams = LoadAccountByEmailRepository.Params
type LoadResult = LoadAccountByEmailRepository.Result
type AddParams = AddAccountRepository.Params
type AddResult = AddAccountRepository.Result

export class PgAccountRepository extends PgRepository implements
  LoadAccountByEmailRepository,
  AddAccountRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  LoadAccountByIdRepository,
  UpdateAccountRoleRepository,
  UpdateResetPasswordTokenRepository,
  UpdatePasswordRepository,
  LoadAccountByResetTokenRepository {
  async loadByEmail (params: LoadParams): Promise<LoadResult> {
    const pgUserRepo = this.getRepository(User)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name,
        email: pgUser.email,
        password: pgUser.password
      }
    }
  }

  async add (params: AddParams): Promise<AddResult> {
    const pgUserRepo = this.getRepository(User)
    const pgRoleRepo = this.getRepository(Role)
    const role = await pgRoleRepo.findOne({ name: 'user' })
    if (role) {
      const account = await pgUserRepo.save({
        email: params.email,
        name: params.name,
        password: params.password,
        role_id: role.id
      })
      if (account) {
        return {
          id: account.id.toString(),
          name: account.name,
          email: account.email
        }
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
    const pgRoleRepo = this.getRepository(Role)

    const pgUser = await pgUserRepo.findOne({ access_token: params.accessToken })
    if (pgUser !== undefined) {
      const userRole = await pgRoleRepo.findOne({ id: pgUser.role_id })
      if (userRole) {
        if (params.role) {
          const paramRole = await pgRoleRepo.findOne({ name: params.role })
          if (paramRole && userRole.weight >= paramRole.weight) {
            return {
              id: pgUser.id.toString(),
              name: pgUser.name,
              email: pgUser.email,
              password: pgUser.password,
              role: userRole.name,
              access_token: pgUser.access_token
            }
          }
        } else {
          return {
            id: pgUser.id.toString(),
            name: pgUser.name,
            email: pgUser.email,
            password: pgUser.password,
            role: userRole.name,
            access_token: pgUser.access_token
          }
        }
      }
    }
    return undefined
  }

  async loadById (params: LoadAccountByIdRepository.Params): Promise<LoadAccountByIdRepository.Result> {
    const pgUserRepo = this.getRepository(User)
    const pgRoleRepo = this.getRepository(Role)

    const pgUser = await pgUserRepo.findOne({ id: params.id })
    if (pgUser) {
      const userRole = await pgRoleRepo.findOne({ id: pgUser.role_id })
      if (userRole) {
        return {
          id: pgUser.id.toString(),
          name: pgUser.name,
          email: pgUser.email,
          role: userRole.name,
          access_token: pgUser.access_token
        }
      }
    }
  }

  async updateAccountRole (params: UpdateAccountRoleRepository.Params): Promise<UpdateAccountRoleRepository.Result> {
    const pgUserRepo = this.getRepository(User)
    const pgRoleRepo = this.getRepository(Role)

    const pgUser = await pgUserRepo.findOne({ id: params.id })
    if (pgUser) {
      const newRole = await pgRoleRepo.findOne({ id: params.roleId })
      if (newRole) {
        pgUser.role_id = newRole.id
        await pgUserRepo.save(pgUser)
        return {
          id: pgUser.id.toString(),
          name: pgUser.name,
          email: pgUser.email,
          role: newRole.name
        }
      }
    }
  }

  async updateResetPasswordToken (params: UpdateResetPasswordTokenRepository.Params): Promise<UpdateResetPasswordTokenRepository.Result> {
    const pgUserRepo = this.getRepository(User)
    const pgRoleRepo = this.getRepository(Role)
    const date = new Date()
    const pgUser = await pgUserRepo.findOne({ id: params.id })
    if (pgUser) {
      const role = await pgRoleRepo.findOne({ id: pgUser.role_id })
      if (role) {
        pgUser.reset_password_token = params.token
        pgUser.reset_password_token_expires_at = new Date(date.setDate(date.getDate() + 2))
        await pgUserRepo.save(pgUser)
        return {
          id: pgUser.id.toString(),
          name: pgUser.name,
          email: pgUser.email,
          role: role.name,
          password: pgUser.password,
          reset_password_token: pgUser.reset_password_token
        }
      }
    }
  }

  async updatePassword (params: UpdatePasswordRepository.Params): Promise<UpdatePasswordRepository.Result> {
    const pgUserRepo = this.getRepository(User)
    const pgUser = await pgUserRepo.findOne({ id: params.id })
    if (pgUser) {
      pgUser.password = params.password
      await pgUserRepo.save(pgUser)
      return {
        id: pgUser.id.toString(),
        name: pgUser.name,
        email: pgUser.email
      }
    }
  }

  async loadByResetToken (params: LoadAccountByResetTokenRepository.Params): Promise<LoadAccountByResetTokenRepository.Result> {
    const pgUserRepo = this.getRepository(User)

    const pgUser = await pgUserRepo.findOne({ reset_password_token: params.token })
    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name,
        email: pgUser.email
      }
    }
  }
}
