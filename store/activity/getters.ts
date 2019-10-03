import { RootState } from "store";
import { GetterTree } from "vuex";
import { ActivityState } from "./state";

const getters: GetterTree<ActivityState, RootState> = {
  activity: state => state.activity,
  isLoading: state => state.isLoading,
  isUpdating: state => state.isUpdating,
  isCreating: state => state.isCreating
};
export default getters;
