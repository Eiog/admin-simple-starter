declare namespace Access {
  type User = {
    id: string;
    account: string;
    name?: string;
    avatar?: string;
  };
  type StatusResult = {
    userInfo: User;
    access: number[];
    role: string;
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
