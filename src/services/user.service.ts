import { Exception } from "@middlewares/error.middleware";
import { Note } from "@repository/note";
import { User } from "@repository/user";
import { IUpdateUser } from "@types";
import { UserUpdationValidator } from "@validators/user.validator";
import { Service } from "typedi";
@Service()
class UserService {
  constructor(
    private readonly user: User,
    private readonly note: Note
  ) {}

  async getUserById(id: number) {
    const user = await this.user.findById(id, {
      select: {
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        id: true,
      },
    });
    if (!user) throw new Exception(400, "Incorrect Id, User does not exist");
    return user;
  }

  async getUser(payload: number) {
    const user = await this.getUserById(payload);
    if (!user) throw new Exception(400, "User not found");
    const totalNotes = await this.note.totalNotes();
    return { ...user, totalNotes };
  }

  async updateUser(id: number, data: IUpdateUser) {
    const { error, value } = UserUpdationValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    await this.getUserById(id);
    return await this.user.updateUser({ id }, value);
  }

  async deleteUser(userId: number): Promise<boolean> {
    const user = await this.getUserById(userId);
    await this.user.deleteUser(user);
    return true;
  }
}

export default UserService;
