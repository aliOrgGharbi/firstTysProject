import { UserModel } from "../schemas/user.schemas";

export interface User {
    email: string;
    password: string;
    createdAt: Date;
}

export async function findAll(): Promise<User[]> {
    return await UserModel.find().lean();
}

export async function findById(id: string): Promise<User | null> {
    return await UserModel.findById(id).lean();
}

export async function createUser(userData: User): Promise<User> {
    const newUser = new UserModel(userData);
    return await newUser.save();
}

export async function updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
}

export async function patchUser(id: string, updateData: Partial<User>) {
  return await UserModel.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true }
  ).lean();
}

export async function deleteUser(id: string): Promise<User | null> {
    return await UserModel.findByIdAndDelete(id).lean();
}