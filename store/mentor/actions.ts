import { plainToClass } from "class-transformer";
import {
  DocumentReference,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { Mentor } from "~/modals";
import { fs } from "~/plugins/firebase";
import { MentorState } from "./state";
import {
  FETCH_END,
  FETCH_START,
  UPDATE_START,
  UPDATE_END,
  CREATE_START,
  CREATE_END,
  DELETE_START,
  DELETE_END
} from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchMentor(context: ActionContext<S, R>, id: string): void;
  updateMentor(
    context: ActionContext<S, R>,
    { id: string, mentor: Mentor }
  ): void;
  createMentor(context: ActionContext<S, R>, mentor: Mentor): Promise<string>;
  deleteMentor(context: ActionContext<S, R>, id: string): Promise<boolean>;
}

const actions: Actions<MentorState, RootState> = {
  async fetchMentor({ commit, state }, id: string) {
    let docRef: DocumentReference = fs.collection("mentors").doc(id);
    try {
      commit(FETCH_START);
      let snap: QuerySnapshot = await docRef.get();
      let mentor: Mentor = snap.data();
      commit(FETCH_END, mentor);
    } catch (e) {
      console.error(e);
    }
  },
  async updateMentor(
    { commit },
    { id, mentor }: { id: string; mentor: Mentor }
  ) {
    let docRef: DocumentReference = fs.collection("mentors").doc(id);
    try {
      commit(UPDATE_START);
      await docRef.update(mentor);
      commit(UPDATE_END, mentor);
    } catch (e) {
      console.error(e);
    }
  },
  async createMentor({ commit }, mentor: Mentor): Promise<string> {
    let colRef: CollectionReference = fs.collection("mentors");
    try {
      commit(CREATE_START);
      let docRef: DocumentReference = await colRef.add(mentor);
      commit(CREATE_END, mentor);
      return docRef.id;
    } catch (e) {
      console.error(e);
    }
    return "";
  },
  async deleteMentor({ commit }, id: string) {
    let docRef: DocumentReference = fs.collection("mentors").doc(id);
    try {
      commit(DELETE_START);
      await docRef.delete();
      commit(DELETE_END);
      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  }
};

export default actions;
