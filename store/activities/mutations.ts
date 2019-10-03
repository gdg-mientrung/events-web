import { MutationTree } from "vuex";
import { Activity } from "~/modals";
import { ActivityState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

const mutations: MutationTree<ActivityState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, activities: Activity[]) {
    state.activities = activities;
    state.isLoading = false;
  }
};

export default mutations;
