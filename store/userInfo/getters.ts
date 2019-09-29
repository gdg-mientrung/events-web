import { RootState } from "store";
import { GetterTree } from "vuex";
import { UserInfoState } from "./state";

const getters: GetterTree<UserInfoState, RootState> = {
  userInfo: state => state.userInfo
};
export default getters;
