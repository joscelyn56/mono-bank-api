import { Service } from 'typedi'
import { User } from "../database/models";
import * as bcrypt from "bcrypt";
import { transformResponse as response } from "../utils/transform-response";

@Service()
export class UserService {
  constructor() {
  }

  public async create (user: any): Promise<any> {
      const query = {
        where: {email: user.email}
      }
      const existingUser = await User.findOne(query)

      if (existingUser)
        throw new Error('User account already exists')

      const newUser = await User.create(user)

      if (!newUser)
        throw new Error('Could not create user account')

      const {password, ...rest} = newUser.get({plain: true})

      return rest
  }
}
