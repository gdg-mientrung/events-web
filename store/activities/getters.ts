import { RootState } from "store";
import { GetterTree } from "vuex";
import { ActivityState } from "./state";

const getters: GetterTree<ActivityState, RootState> = {
  activities: state => state.activities,
  isLoading: state => state.isLoading
};
export default getters;
