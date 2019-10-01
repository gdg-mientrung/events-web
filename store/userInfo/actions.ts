import { UserInfo } from "firebase";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { UserInfoState } from "./state";
import { REMOVE_USER_INFO } from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {}

const actions: Actions<UserInfoState, RootState> = {};

export default actions;
