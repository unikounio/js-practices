import MemoRepository from "./memo_repository.js";

export class MemoCsvRepository extends MemoRepository {
  constructor() {
    super();
  }
  async create() {}
  async getAll() {}
  async getByTitle() {}
  async deleteByTitle() {}
}
