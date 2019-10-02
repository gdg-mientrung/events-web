import { MutationTree } from "vuex";
import { EventTime } from "~/modals";
import { EventTimeState } from "./state";
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

const mutations: MutationTree<EventTimeState> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, eventTime: EventTime) {
    state.eventTime = eventTime;
    state.isLoading = false;
  },
  [UPDATE_START](state) {
    state.isUpdating = true;
  },
  [UPDATE_END](state, eventTime: EventTime) {
    state.eventTime = eventTime;
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
