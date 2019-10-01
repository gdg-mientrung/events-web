import { RootState } from "store";
import { GetterTree } from "vuex";
import { AuthenticationAlertsState } from "./state";

const getters: GetterTree<AuthenticationAlertsState, RootState> = {
  errorAlert: state => state.errorAlert
};
export default getters;
