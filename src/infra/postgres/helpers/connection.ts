
import { Connection, createConnection,getConnection, getConnectionManager, QueryRunner } from "typeorm";
import { ConnectionNotFoundError } from "@/infra/postgres/helpers";

export class PgConnection {
  private static instance?: PgConnection;
  private query?: QueryRunner

  private constructor() {}

  static getInstance(): PgConnection {
    if(PgConnection.instance === undefined) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async connect(): Promise<void> {
    let connection: Connection = getConnectionManager().has('default')
      ? getConnection()
      : await createConnection()
    this.query = connection.createQueryRunner()
  }

  async disconnect(): Promise<void> {
    if(this.query === undefined) throw new ConnectionNotFoundError()
    await getConnection().close()
    this.query = undefined
  }

  async openTransaction(): Promise<void> {
    if(this.query === undefined) throw new ConnectionNotFoundError()
    await  this.query.startTransaction()
  }

  async closeTransaction(): Promise<void> {
    if(this.query === undefined) throw new ConnectionNotFoundError()
    await  this.query.release()
  }

  async commitTransaction(): Promise<void> {
    if(this.query === undefined) throw new ConnectionNotFoundError()
    await  this.query.commitTransaction()
  }

  async rollbackTransaction(): Promise<void> {
    if(this.query === undefined) throw new ConnectionNotFoundError()
    await  this.query.rollbackTransaction()
  }
}