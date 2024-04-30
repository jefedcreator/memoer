import { Exception } from "@middlewares/error.middleware";
import { User } from "@repository/user";
import { IChangePassword, IUser } from "@types";
import { jwt, password } from "@utils";
import {
  LoginValidator,
  ResetPasswordValidator,
  UserRegistrationValidator,
} from "@validators/user.validator";
import { Service } from "typedi";

@Service()
class AuthService {
  constructor(private readonly user: User) {}

  public async signUp(payload: IUser) {
    const { error, value } = UserRegistrationValidator(payload);
    if (error) throw new Exception(400, error.details[0].message);
    const email = await this.user.findByEmail(value.email);
    if (email) throw new Exception(409, "email already exists");
    const username = await this.user.findByUsername(value.name);
    if (username) throw new Exception(409, "username already exists");
    const passwordHash = await password.hash(value.password);
    const user = await this.user.create({
      ...value,
      password: passwordHash,
    });
    return user;
  }

  public async signIn(payload: IUser) {
    const { error, value } = LoginValidator(payload);
    if (error) throw new Exception(400, error.details[0].message);
    const user = await this.user.findByEmail(value.email);
    if (!user) throw new Exception(400, "Incorrect email, User does not exist");
    let compare = await password.verify(value.password, user.password);
    if (!compare) throw new Exception(400, "Incorrect password");
    let token = jwt.sign(user.email);
    return {
      ...user,
      token,
    };
  }

  async resetPassword(payload: IChangePassword): Promise<boolean> {
    const { error, value } = ResetPasswordValidator(payload);
    if (error) throw new Exception(400, error.details[0].message);
    if (value.password != value.confirmPassword)
      throw new Exception(400, "Passwords do not match");
    const user = await this.user.findByEmail(value.email);
    if (!user) throw new Exception(400, "User not found");
    const isSame = await password.verify(value.password, user.password);
    if (isSame)
      throw new Exception(400, "Password is the same as old password");
    let hashedPassword = await password.hash(value.password);
    await this.user.updateUser(
      { email: value.email },
      {
        password: hashedPassword,
      }
    );
    return true;
  }
}

export default AuthService;
