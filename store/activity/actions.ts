import { plainToClass } from "class-transformer";
import {
  DocumentReference,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { Activity } from "~/modals";
import { fs } from "~/plugins/firebase";
import { ActivityState } from "./state";
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
  fetchActivity(
    context: ActionContext<S, R>,
    {
      eventDateId,
      eventTimeId,
      id
    }: { eventDateId: string; eventTimeId: string; id: string }
  ): void;
  updateActivity(
    context: ActionContext<S, R>,
    {
      eventDateId,
      eventTimeId,
      id,
      activity
    }: {
      eventDateId: string;
      eventTimeId: string;
      id: string;
      activity: Activity;
    }
  ): void;
  createActivity(
    context: ActionContext<S, R>,
    {
      eventDateId,
      eventTimeId,
      activity
    }: { eventDateId: string; eventTimeId: string; activity: Activity }
  ): Promise<string>;
  deleteActivity(
    context: ActionContext<S, R>,
    {
      eventDateId,
      eventTimeId,
      id
    }: { eventDateId: string; eventTimeId: string; id: string }
  ): Promise<boolean>;
}

const actions: Actions<ActivityState, RootState> = {
  async fetchActivity(
    { commit, state },
    {
      eventDateId,
      eventTimeId,
      id
    }: { eventDateId: string; eventTimeId: string; id: string }
  ) {
    let docRef: DocumentReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline")
      .doc(eventTimeId)
      .collection("activities")
      .doc(id);
    try {
      commit(FETCH_START);
      let snap: QuerySnapshot = await docRef.get();
      let activity: Activity = snap.data();
      commit(FETCH_END, activity);
    } catch (e) {
      console.error(e);
    }
  },
  async updateActivity(
    { commit },
    {
      eventDateId,
      eventTimeId,
      id,
      activity
    }: {
      eventDateId: string;
      eventTimeId: string;
      id: string;
      activity: Activity;
    }
  ) {
    let docRef: DocumentReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline")
      .doc(eventTimeId)
      .collection("activities")
      .doc(id);
    try {
      commit(UPDATE_START);
      await docRef.update(activity);
      commit(UPDATE_END, activity);
    } catch (e) {
      console.error(e);
    }
  },
  async createActivity(
    { commit },
    {
      eventDateId,
      eventTimeId,
      activity
    }: { eventDateId: string; eventTimeId: string; activity: Activity }
  ): Promise<string> {
    let colRef: CollectionReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline")
      .doc(eventTimeId)
      .collection("activities");
    try {
      commit(CREATE_START);
      let docRef: DocumentReference = await colRef.add(activity);
      commit(CREATE_END, activity);
      return docRef.id;
    } catch (e) {
      console.error(e);
    }
    return "";
  },
  async deleteActivity(
    { commit },
    {
      eventDateId,
      eventTimeId,
      id
    }: { eventDateId: string; eventTimeId: string; id: string }
  ) {
    let docRef: DocumentReference = fs
      .collection("schedule")
      .doc(eventDateId)
      .collection("timeline")
      .doc(eventTimeId)
      .collection("activities")
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
