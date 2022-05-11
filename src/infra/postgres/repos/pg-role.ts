import { AddRoleRepository, LoadRoleByIdRepository, LoadRoleByNameRepository, LoadRolesRepository, UpdateRoleRepository } from "@/data/protocols/db";
import { PgRepository } from "@/infra/postgres/repos/repository";
import { Role } from "@/infra/postgres/entities";

export class PgRoleRepository extends PgRepository implements
LoadRoleByNameRepository,
AddRoleRepository,
LoadRolesRepository,
LoadRoleByIdRepository,
UpdateRoleRepository {
  async loadByName (params: LoadRoleByNameRepository.Params): Promise<LoadRoleByNameRepository.Result>{
    const roleRepo =  this.getRepository(Role)
    const role = await roleRepo.findOne({ name: params.name})
    if(role) {
      return {
        id: role.id.toString(),
        name: role.name,
        weight: role.weight,
        created_at: role.created_at
      }
    }
  }
  async add (params: AddRoleRepository.Params): Promise<AddRoleRepository.Result>{
    const role =  await this.getRepository(Role).save({
      name: params.name,
      weight: params.weight
    })
    if(role){
      return {
        id: role.id.toString(),
        name: role.name,
        weight: role.weight,
        created_at: role.created_at
      }
    }
  }

  async load (params: LoadRolesRepository.Params): Promise<LoadRolesRepository.Result> {
    const roleRepo =  this.getRepository(Role)
    const roles = await roleRepo.find({select: ['id', 'name', 'weight', 'created_at']})
    if(roles.length > 0) {
      return roles
    }
  }

  async loadById (params: LoadRoleByIdRepository.Params): Promise<LoadRoleByIdRepository.Result> {
    const roleRepo =  this.getRepository(Role)
    const role = await roleRepo.findOne({id: params.id})
    if(role) {
      return {
        id: role.id.toString(),
        name: role.name,
        weight: role.weight,
        created_at: role.created_at
      }
    }
  }

  async update (params: UpdateRoleRepository.Params): Promise<UpdateRoleRepository.Result>{
    const roleRepo =  this.getRepository(Role)
    const role = await roleRepo.findOne({id: params.id})
    if(role) {
      const updatedRole = await roleRepo.save({
        id: role.id,
        name: params.name ? params.name : role.name,
        weight: params.weight ? params.weight : role.weight,
      })
      if(updatedRole) {
        return {
          id: updatedRole.id.toString(),
          name: updatedRole.name,
          weight: updatedRole.weight,
          created_at: role.created_at
        }
      }
    }
  }
}
