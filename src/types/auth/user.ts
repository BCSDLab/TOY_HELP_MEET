export interface UserDTO {
  id: number;
  kakaoId: string;
  name: string;
  profileImageUrl: string;
  phoneNumber: string;
}

export type UserResponse = UserDTO;
