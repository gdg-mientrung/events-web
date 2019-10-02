import { plainToClass } from "class-transformer";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference,
  DocumentReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { Organization } from "~/modals";
import { fs } from "~/plugins/firebase";
import { OrganizationState } from "./state";
import { FETCH_END, FETCH_START } from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchOrganizations(
    context: ActionContext<S, R>,
    params: { typeId: string; pagination: any; filters: any; sorter: any }
  ): void;
}

const actions: Actions<OrganizationState, RootState> = {
  async fetchOrganizations(
    { commit, state },
    { typeId, pagination, filters, sorter }
  ) {
    let colRef: CollectionReference = fs.collection(
      `organization/${typeId}/organizations`
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
      console.log("--------> snap.docs.length" + snap.docs.length);
      let organizations: Organization[] = snap.docs.map(
        (doc: QueryDocumentSnapshot) =>
          plainToClass(Organization, {
            ...doc.data(),
            id: doc.id
          })
      );
      console.log(
        "--------> JSON.stringify(organizations, null, 2)" +
          JSON.stringify(organizations, null, 2)
      );
      commit(FETCH_END, organizations);
    } catch (e) {
      console.error(e);
    }
  }
};

export default actions;
