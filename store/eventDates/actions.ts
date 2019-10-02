import { plainToClass } from "class-transformer";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { EventDate } from "~/modals";
import { fs } from "~/plugins/firebase";
import { EventDateState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchEventDates(
    context: ActionContext<S, R>,
    params: { pagination: any; filters: any; sorter: any }
  ): void;
}

const actions: Actions<EventDateState, RootState> = {
  async fetchEventDates({ commit, state }, { pagination, filters, sorter }) {
    let colRef: CollectionReference = fs.collection("schedule");
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
      let eventDates: EventDate[] = snap.docs.map(
        (doc: QueryDocumentSnapshot) =>
          plainToClass(EventDate, {
            ...doc.data(),
            id: doc.id
          })
      );
      commit(FETCH_END, eventDates);
    } catch (e) {
      console.error(e);
    }
  }
};

export default actions;
