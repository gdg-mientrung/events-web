import { MutationTree } from "vuex";
import { Organization } from "~/modals";
import { OrganizationState } from "./state";
import {
  FETCH_END,
  FETCH_START,
  UPDATE_END,
  UPDATE_START,
  CREATE_START,
  CREATE_END,
  DELETE_START,
  DELETE_END
} from "./types";

const mutations: MutationTree<OrganizationState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, organization: Organization) {
    state.organization = organization;
    state.isLoading = false;
  },
  [UPDATE_START](state) {
    state.isUpdating = true;
  },
  [UPDATE_END](state, organization: Organization) {
    state.organization = organization;
    state.isUpdating = false;
  },
  [CREATE_START](state) {
    state.isCreating = true;
  },
  [CREATE_END](state) {
    state.isCreating = false;
  },
  [DELETE_START](state) {
    state.isDeleting = true;
  },
  [DELETE_END](state) {
    state.isDeleting = false;
  }
};

export default mutations;
