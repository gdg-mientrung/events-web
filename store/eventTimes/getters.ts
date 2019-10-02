import { RootState } from "store";
import { GetterTree } from "vuex";
import { EventTimeState } from "./state";

const getters: GetterTree<EventTimeState, RootState> = {
  eventTimes: state => state.eventTimes,
  isLoading: state => state.isLoading
};
export default getters;
