// common
interface KakaoError {
  code: number;
  msg: string;
}

interface Cleanable {
  cleanup: () => void;
}

// API
export interface APIRequestSettings {
  url: string;
  data?: Record<string, unknown>;
  files?: FileList | File[] | Blob[];
}

export interface KakaoAPI extends Cleanable {
  request: <T>(settings: APIRequestSettings) => Promise<T>;
}

// Auth
export interface AuthorizeSettings {
  redirectUri?: string;
  state?: string;
  scope?: string;
  prompt?: string;
  loginHint?: string;
  nonce?: string;
  throughTalk?: boolean;
}

export interface LogoutResponse {
  userInfo: {
    id: number;
  };
}

export interface AuthError extends KakaoError { }

export interface StatusResponse {
  statusInfo: {
    status: '로그인 상태' | '비로그인 상태'; // 또는 'Logged in' | 'Not logged in';
    user: Record<string, unknown>;
  }
}

export interface KakaoAuth extends Cleanable {
  authorize: (settings?: AuthorizeSettings) => void;
  getAccessToken: () => string;
  getStatusInfo: () => Promise<StatusResponse | AuthError>;
  logout: () => Promise<LogoutResponse | AuthError>;
  setAccessToken: (token: string) => void;
}

// Picker
export interface BasePickerSettings {
  title?: string; // default: '카카오톡 친구 선택'
  bleSearch?: boolean;
  showMyProfile?: boolean;
  showFavorite?: boolean;
  enableBackButton?: boolean;
  returnUrl?: string;
}

export interface SelectFriendSettings extends BasePickerSettings { }

export interface SelectFriendsSettings extends BasePickerSettings {
  maxPickableCount?: number; // default: 30
  minPickableCount?: number; // default: 1
}

export interface SelectedUser {
  uuid: string;
  id: string | null;
  profile_nickname: string | null;
  profile_thumbnail_image: string | null;
  favorite: boolean | null;
}

export interface FriendsPickerResponse {
  response: {
    selectedTotalCount: number;
    users: SelectedUser[];
  }
}

export interface PickerError extends KakaoError { }

export interface KakaoPicker extends Cleanable {
  selectFriend: (settings?: SelectFriendSettings) => Promise<FriendsPickerResponse | PickerError>;
  selectFriends: (settings?: SelectFriendsSettings) => Promise<FriendsPickerResponse | PickerError>;
}

export interface KakaoSDK extends Cleanable {
  init: (key: string) => void;
  isInitialized: () => boolean;
  API: KakaoAPI;
  Auth: KakaoAuth;
  Picker: KakaoPicker;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}
