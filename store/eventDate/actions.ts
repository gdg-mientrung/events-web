import { plainToClass } from "class-transformer";
import {
  DocumentReference,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { EventDate } from "~/modals";
import { fs } from "~/plugins/firebase";
import { EventDateState } from "./state";
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
  fetchEventDate(context: ActionContext<S, R>, id: string): void;
  updateEventDate(
    context: ActionContext<S, R>,
    { id: string, eventDate: EventDate }
  ): void;
  createEventDate(
    context: ActionContext<S, R>,
    eventDate: EventDate
  ): Promise<string>;
  deleteEventDate(context: ActionContext<S, R>, id: string): Promise<boolean>;
}

const actions: Actions<EventDateState, RootState> = {
  async fetchEventDate({ commit, state }, id: string) {
    let docRef: DocumentReference = fs.collection("schedule").doc(id);
    try {
      commit(FETCH_START);
      let snap: QuerySnapshot = await docRef.get();
      let eventDate: EventDate = plainToClass(EventDate, {
        ...snap.data(),
        id: snap.id
      });
      commit(FETCH_END, eventDate);
    } catch (e) {
      console.error(e);
    }
  },
  async updateEventDate(
    { commit },
    { id, eventDate }: { id: string; eventDate: EventDate }
  ) {
    let docRef: DocumentReference = fs.collection("schedule").doc(id);
    try {
      commit(UPDATE_START);
      await docRef.update(eventDate);
      commit(UPDATE_END, eventDate);
    } catch (e) {
      console.error(e);
    }
  },
  async createEventDate({ commit }, eventDate: EventDate): Promise<string> {
    let colRef: CollectionReference = fs.collection("schedule");
    try {
      commit(CREATE_START);
      console.log(
        "--------> JSON.stringify(eventDate, null, 2)" +
          JSON.stringify(eventDate, null, 2)
      );
      let docRef: DocumentReference = await colRef.add(eventDate);
      commit(CREATE_END, eventDate);
      return docRef.id;
    } catch (e) {
      console.error(e);
    }
    return "";
  },
  async deleteEventDate({ commit }, id: string) {
    let docRef: DocumentReference = fs.collection("schedule").doc(id);
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
