import { MutationTree } from "vuex";
import { Mentor } from "~/modals";
import { MentorState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

const mutations: MutationTree<MentorState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, mentors: Mentor[]) {
    state.mentors = mentors;
    state.isLoading = false;
  }
};

export default mutations;
