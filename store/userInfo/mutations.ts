import { MutationTree } from "vuex";
import { UserInfo } from "firebase";
import { UserInfoState } from "./state";
import { SET_USER_INFO } from "./types";

const mutations: MutationTree<UserInfoState> = {
  [SET_USER_INFO](state, userInfo: UserInfo) {
    state.userInfo = userInfo;
  }
};

export default mutations;
