import { plainToClass } from "class-transformer";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { OrganizationType } from "~/modals";
import { fs } from "~/plugins/firebase";
import { OrganizationTypeState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchOrganizationTypes(
    context: ActionContext<S, R>,
    params: { pagination: any; filters: any; sorter: any }
  ): void;
}

const actions: Actions<OrganizationTypeState, RootState> = {
  async fetchOrganizationTypes(
    { commit, state },
    { pagination, filters, sorter }
  ) {
    let colRef: CollectionReference = fs.collection("organization");
    try {
      commit(FETCH_START);

      if (filters) {
      }
      if (pagination) {
        colRef = colRef.limit(pagination.pageSize);
      }
      console.log(
        "--------> JSON.stringify(sorter, null, 2)" +
          JSON.stringify(sorter, null, 2)
      );
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
      let organizationTypes: OrganizationType[] = snap.docs.map(
        (doc: QueryDocumentSnapshot) =>
          plainToClass(OrganizationType, {
            ...doc.data(),
            id: doc.id
          })
      );
      commit(FETCH_END, organizationTypes);
    } catch (e) {
      console.error(e);
    }
  }
};

export default actions;
