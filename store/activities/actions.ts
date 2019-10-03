import { plainToClass } from "class-transformer";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference,
  DocumentReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { Activity } from "~/modals";
import { fs } from "~/plugins/firebase";
import { ActivityState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchActivities(
    context: ActionContext<S, R>,
    params: {
      eventDateId: string;
      eventTimeId: string;
      pagination: any;
      filters: any;
      sorter: any;
    }
  ): void;
}

const actions: Actions<ActivityState, RootState> = {
  async fetchActivities(
    { commit, state },
    { eventDateId, eventTimeId, pagination, filters, sorter }
  ) {
    let colRef: CollectionReference = fs.collection(
      `schedule/${eventDateId}/timeline/${eventTimeId}/activities`
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
      let activities: Activity[] = snap.docs.map((doc: QueryDocumentSnapshot) =>
        plainToClass(Activity, {
          ...doc.data(),
          id: doc.id
        })
      );
      commit(FETCH_END, activities);
    } catch (e) {
      console.error(e);
    }
  }
};

export default actions;
