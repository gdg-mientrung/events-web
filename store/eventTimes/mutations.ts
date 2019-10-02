import { MutationTree } from "vuex";
import { EventTime } from "~/modals";
import { EventTimeState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

const mutations: MutationTree<EventTimeState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, eventTimes: EventTime[]) {
    state.eventTimes = eventTimes;
    state.isLoading = false;
  }
};

export default mutations;
