import { RootState } from "store";
import { GetterTree } from "vuex";
import { EventTimeState } from "./state";

const getters: GetterTree<EventTimeState, RootState> = {
  eventTime: state => state.eventTime,
  isLoading: state => state.isLoading,
  isUpdating: state => state.isUpdating,
  isCreating: state => state.isCreating
};
export default getters;
