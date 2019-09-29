import { plainToClass } from "class-transformer";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  Query
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { Mentor } from "~/modals";
import { fs } from "~/plugins/firebase";
import { MentorState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchMentor(context: ActionContext<S, R>, id: string): void;
}

const actions: Actions<MentorState, RootState> = {
  async fetchMentor({ commit, state }, id: string) {
    let ref: Query = fs.collection("mentors").doc(id);
    try {
      commit(FETCH_START);
      let snap: QuerySnapshot = await ref.get();
      let mentor: Mentor = snap.data();
      console.log(
        "--------> JSON.stringify(mentor, null, 2)" +
          JSON.stringify(mentor, null, 2)
      );
      commit(FETCH_END, mentor);
    } catch (e) {
      console.error(e);
    }
  }
};

export default actions;
