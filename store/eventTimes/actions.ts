import { plainToClass } from "class-transformer";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { EventTime } from "~/modals";
import { fs } from "~/plugins/firebase";
import { EventTimeState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchEventTimes(
    context: ActionContext<S, R>,
    params: { eventDateId: string; pagination: any; filters: any; sorter: any }
  ): void;
}

const actions: Actions<EventTimeState, RootState> = {
  async fetchEventTimes(
    { commit, state },
    { eventDateId, pagination, filters, sorter }
  ) {
    let colRef: CollectionReference = fs.collection(
      `schedule/${eventDateId}/timeline`
    );
    try {
      commit(FETCH_START);

      if (filters) {
      }
      if (pagination) {
        colRef = colRef.limit(pagination.pageSize);
      }
      if (sorter) {
        switch (sorter.order) {
          case "ascend":
            colRef = colRef.orderBy(sorter.field);
            break;
          case "descend":
            colRef = colRef.orderBy(sorter.field, "desc");
            break;
          default:
        }
      }

      let snap: QuerySnapshot = await colRef.get();
      let eventTimes: EventTime[] = snap.docs.map(
        (doc: QueryDocumentSnapshot) =>
          plainToClass(EventTime, {
            ...doc.data(),
            id: doc.id
          })
      );
      commit(FETCH_END, eventTimes);
    } catch (e) {
      console.error(e);
    }
  }
};

export default actions;
