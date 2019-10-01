import { MutationTree } from "vuex";
import { OrganizationType } from "~/modals";
import { OrganizationTypeState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

const mutations: MutationTree<OrganizationTypeState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, organizationTypes: OrganizationType[]) {
    state.organizationTypes = organizationTypes;
    state.isLoading = false;
  }
};

export default mutations;
