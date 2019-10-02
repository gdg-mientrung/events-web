import { MutationTree } from "vuex";
import { EventDate } from "~/modals";
import { EventDateState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

const mutations: MutationTree<EventDateState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, eventDates: EventDate[]) {
    state.eventDates = eventDates;
    state.isLoading = false;
  }
};

export default mutations;
