export interface IUser {
  _id: string;
  phone: string;
  nickname: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserDto {
  phone: string;
  nickname: string;
}
