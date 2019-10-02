import { plainToClass } from "class-transformer";
import {
  DocumentReference,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { EventTime } from "~/modals";
import { fs } from "~/plugins/firebase";
import { EventTimeState } from "./state";
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
  fetchEventTime(
    context: ActionContext<S, R>,
    { eventDateId, id }: { eventDateId: string; id: string }
  ): void;
  updateEventTime(
    context: ActionContext<S, R>,
    {
      eventDateId,
      id,
      eventTime
    }: { eventDateId: string; id: string; eventTime: EventTime }
  ): void;
  createEventTime(
    context: ActionContext<S, R>,
    { eventDateId, eventTime }: { eventDateId: string; eventTime: EventTime }
  ): Promise<string>;
  deleteEventTime(
    context: ActionContext<S, R>,
    { eventDateId, id }: { eventDateId: string; id: string }
  ): Promise<boolean>;
}

const actions: Actions<EventTimeState, RootState> = {
  async fetchEventTime({ commit, state }, { eventDateId, id }) {
    let docRef: DocumentReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline")
      .doc(id);
    try {
      commit(FETCH_START);
      let snap: QuerySnapshot = await docRef.get();
      let eventTime: EventTime = plainToClass(EventTime, {
        ...snap.data(),
        id: snap.id
      });
      commit(FETCH_END, eventTime);
    } catch (e) {
      console.error(e);
    }
  },
  async updateEventTime(
    { commit },
    {
      eventDateId,
      id,
      eventTime
    }: { eventDateId: string; id: string; eventTime: EventTime }
  ) {
    let docRef: DocumentReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline")
      .doc(id);
    try {
      commit(UPDATE_START);
      await docRef.update(eventTime);
      commit(UPDATE_END, eventTime);
    } catch (e) {
      console.error(e);
    }
  },
  async createEventTime(
    { commit },
    {
      eventDateId,

      eventTime
    }: { eventDateId: string; eventTime: EventTime }
  ): Promise<string> {
    let colRef: CollectionReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline");

    try {
      commit(CREATE_START);
      console.log(
        "--------> JSON.stringify(eventTime, null, 2)" +
          JSON.stringify(eventTime, null, 2)
      );
      let docRef: DocumentReference = await colRef.add(eventTime);
      commit(CREATE_END, eventTime);
      return docRef.id;
    } catch (e) {
      console.error(e);
    }
    return "";
  },
  async deleteEventTime(
    { commit },
    { eventDateId, id }: { eventDateId: string; id: string }
  ) {
    let docRef: DocumentReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline")
      .doc(id);
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
