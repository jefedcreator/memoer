import { Exception } from "@middlewares/error.middleware";
import { User } from "@repository/user";
import { Service } from "typedi";

@Service()
class UserServie {
  constructor(private readonly user: User) {}

  async deleteUser(payload: number): Promise<boolean> {
    const user = await this.user.findById(payload);
    if (!user) throw new Exception(400, "User not found");
    await this.user.deleteUser(user);
    return true;
  }
}

export default UserServie;
