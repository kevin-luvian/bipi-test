import { Knex } from "knex";

export interface Dependencies {
  db: Knex;
}

class Repository {
  public path: string = "";
  private db: Knex;

  constructor(dep: Dependencies) {
    this.db = dep.db;
  }

  public GetAll = () => {
    this.db.select("*").from("bruh");
  };
}

export default Repository;
