import { AddEventRepository, LoadEventByNameRepository } from "@/data/protocols/db";
import { Event } from "@/infra/postgres/entities";
import { PgRepository } from "./repository";

export class PgEventRepository extends PgRepository implements
  LoadEventByNameRepository,
  AddEventRepository
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

  async add (params: AddEventRepository.Params): Promise<AddEventRepository.Result>{
    const eventRepo = this.getRepository(Event)
    const event = await eventRepo.save({
      name: params.name,
      description: params.description,
      user_id: params.userId
    })
    if(event) {
      return {
        id: event.id.toString(),
        name: event.name,
        description: event.description,
        user_id: event.user_id,
        created_at: event.created_at
      }
    }
  }

}
