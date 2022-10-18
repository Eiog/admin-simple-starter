declare namespace Access {
  type User = {
    id: string;
    account: string;
    name?: string;
    access: number;
    role?: string;
    avatar?: string;
  };
  type StatusResult = {
    userInfo: User;
    token: string;
  };
  type StatusParam = {
    token: string;
  };
  type LoginParam = {
    account: string;
    password: string;
  };
}
