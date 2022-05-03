import { LoadEventByNameRepository } from "@/data/protocols/db";
import { Event } from "@/infra/postgres/entities";
import { PgRepository } from "./repository";

export class PgEventRepository extends PgRepository implements
  LoadEventByNameRepository
{
  async loadByName (params: LoadEventByNameRepository.Params): Promise<LoadEventByNameRepository.Result> {
    const eventRepo =  this.getRepository(Event)
    const event = await eventRepo.findOne({ name: params.name, user_id: params.userId })
    if(event) {
      return {
        id: event.id.toString(),
        name: event.name,
        user_id: event.user_id,
        description: event.description,
        created_at: event.created_at
      }
    }
  }

}
