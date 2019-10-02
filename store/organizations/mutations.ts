import { MutationTree } from "vuex";
import { Organization } from "~/modals";
import { OrganizationState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

const mutations: MutationTree<OrganizationState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, organizations: Organization[]) {
    state.organizations = organizations;
    state.isLoading = false;
  }
};

export default mutations;
