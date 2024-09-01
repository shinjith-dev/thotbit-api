export type DBResponse = {
  result: [{ results?: any[]; success: boolean }];
  success: boolean;
  errors: any[];
  messages: any[];
};

export type User = {
  id: string;
  uid: string;
  username: string;
  email: string;
  password_hash: string;
  verified: 0 | 1;
  first_name?: string;
  last_name?: string;
};
