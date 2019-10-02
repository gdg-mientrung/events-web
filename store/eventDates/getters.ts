import { RootState } from "store";
import { GetterTree } from "vuex";
import { EventDateState } from "./state";

const getters: GetterTree<EventDateState, RootState> = {
  eventDates: state => state.eventDates,
  isLoading: state => state.isLoading
};
export default getters;
