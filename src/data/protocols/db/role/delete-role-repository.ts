export interface DeleteRoleRepository {
  delete: (params: DeleteRoleRepository.Params) => Promise<DeleteRoleRepository.Result>
}

export namespace DeleteRoleRepository {
  export type Params = {
    id: string
  }

  export type Result = undefined
}
