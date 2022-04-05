class PgConnection {
  private static instance?: PgConnection;
  private constructor() {}

  static getInstance(): PgConnection {
    if(PgConnection.instance === undefined) PgConnection.instance = new PgConnection();

    return PgConnection.instance;
  }
}

describe('PgConnection', () => {
  it('Should be a singleton', () => {
    const sut = PgConnection.getInstance();
    const sut2 = PgConnection.getInstance();

    expect(sut).toBe(sut2);
  })
})
