import { AddRoleRepository, LoadRoleByNameRepository, LoadRolesRepository } from "@/data/protocols/db";
import { PgRepository } from "@/infra/postgres/repos/repository";
import { Role } from "@/infra/postgres/entities";

export class PgRoleRepository extends PgRepository implements
LoadRoleByNameRepository,
AddRoleRepository,
LoadRolesRepository {
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
    if(roles) {
      return roles
    }
  }
}
