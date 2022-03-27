export interface AuthResponse {
  user: User
  access_token: string,
}

export interface User {
  id: number,
  nickname: string,
  email: string,
  is_admin?: boolean,
  winning_percentage?: number,
  created_at: string,
  updated_at: string,
}
