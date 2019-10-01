import { RootState } from "store";
import { ActionTree } from "vuex";
import { AuthenticationAlertsState } from "./state";

export interface Actions<S, R> extends ActionTree<S, R> {}

const actions: Actions<AuthenticationAlertsState, RootState> = {};

export default actions;
