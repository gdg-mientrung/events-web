import { UserInfo } from "firebase";

export interface UserInfoState {
  userInfo: UserInfo | null;
}

const state = (): UserInfoState => ({
  userInfo: null
});

export default state;
