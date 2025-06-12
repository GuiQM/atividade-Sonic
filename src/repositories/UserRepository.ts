import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string) {
    const user = new User(name, email, password);
    user.name = name;
    user.email = email;
    user.password = password;
    return await this.repo.save(user);
  }
  

  async findUserByEmail(email: string) {
    return await this.repo.findOneBy({ email });
   
  }

  async findUserById(id: number) {
    return await this.repo.findOne({ where: { id } });
    
  }

  async updateUser(id: number, fields: Partial<User>) {
    const user = await this.findUserById(id);
    if (!user) return null;

    user.setPreviousPassword(user.password);

    Object.assign(user, fields);
    return await this.repo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) return null;
    return await this.repo.remove(user);
  }

  async findAllUsers() {
    return await this.repo.find();
  }
}