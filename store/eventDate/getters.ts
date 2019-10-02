import { RootState } from "store";
import { GetterTree } from "vuex";
import { EventDateState } from "./state";

const getters: GetterTree<EventDateState, RootState> = {
  eventDate: state => state.eventDate,
  isLoading: state => state.isLoading,
  isUpdating: state => state.isUpdating,
  isCreating: state => state.isCreating
};
export default getters;
