import { RootState } from "store";
import { GetterTree } from "vuex";
import { MentorState } from "./state";

const getters: GetterTree<MentorState, RootState> = {
  mentors: state => state.mentors,
  isLoading: state => state.isLoading
};
export default getters;
