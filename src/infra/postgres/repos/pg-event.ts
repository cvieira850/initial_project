import { LoadEventByNameRepository } from "@/data/protocols/db";
import { PgRepository } from "./repository";

export class PgEventRepository extends PgRepository implements
  LoadEventByNameRepository
{
  async loadByName (params: LoadEventByNameRepository.Params): Promise<LoadEventByNameRepository.Result> {
    return undefined
  }

}
