import { RootState } from "store";
import { GetterTree } from "vuex";
import { MentorState } from "./state";

const getters: GetterTree<MentorState, RootState> = {
  mentor: state => state.mentor,
  isLoading: state => state.isLoading
};
export default getters;
