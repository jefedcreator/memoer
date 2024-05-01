import { Exception } from "@middlewares/error.middleware";
import { Note } from "@repository/note";
import { User } from "@repository/user";
import { Service } from "typedi";
@Service()
class UserService {
  constructor(
    private readonly user: User,
    private readonly note: Note,
  ) {}

  async deleteUser(payload: number): Promise<boolean> {
    const user = await this.user.findById(payload);
    if (!user) throw new Exception(400, "User not found");
    await this.user.deleteUser(user);
    return true;
  }
}

export default UserService;
