import { MutationTree } from "vuex";
import { AuthenticationAlertsState } from "./state";
import { REMOVE_ERROR_ALERT, SET_ERROR_ALERT } from "./types";

const mutations: MutationTree<AuthenticationAlertsState> = {
  [SET_ERROR_ALERT](state, errorAlert: string) {
    state.errorAlert = errorAlert;
  },
  [REMOVE_ERROR_ALERT](state) {
    state.errorAlert = "";
  }
};

export default mutations;
