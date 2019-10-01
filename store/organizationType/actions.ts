import { plainToClass } from "class-transformer";
import {
  DocumentReference,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { OrganizationType } from "~/modals";
import { fs } from "~/plugins/firebase";
import { OrganizationTypeState } from "./state";
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
  fetchOrganizationType(context: ActionContext<S, R>, id: string): void;
  updateOrganizationType(
    context: ActionContext<S, R>,
    { id: string, organizationType: OrganizationType }
  ): void;
  createOrganizationType(
    context: ActionContext<S, R>,
    organizationType: OrganizationType
  ): Promise<string>;
  deleteOrganizationType(
    context: ActionContext<S, R>,
    id: string
  ): Promise<boolean>;
}

const actions: Actions<OrganizationTypeState, RootState> = {
  async fetchOrganizationType({ commit, state }, id: string) {
    let docRef: DocumentReference = fs.collection("organization").doc(id);
    try {
      commit(FETCH_START);
      let snap: QuerySnapshot = await docRef.get();
      let organizationType: OrganizationType = snap.data();
      commit(FETCH_END, organizationType);
    } catch (e) {
      console.error(e);
    }
  },
  async updateOrganizationType(
    { commit },
    { id, organizationType }: { id: string; organizationType: OrganizationType }
  ) {
    let docRef: DocumentReference = fs.collection("organization").doc(id);
    try {
      commit(UPDATE_START);
      await docRef.update(organizationType);
      commit(UPDATE_END, organizationType);
    } catch (e) {
      console.error(e);
    }
  },
  async createOrganizationType(
    { commit },
    organizationType: OrganizationType
  ): Promise<string> {
    let colRef: CollectionReference = fs.collection("organization");
    try {
      commit(CREATE_START);
      let docRef: DocumentReference = await colRef.add(organizationType);
      commit(CREATE_END, organizationType);
      return docRef.id;
    } catch (e) {
      console.error(e);
    }
    return "";
  },
  async deleteOrganizationType({ commit }, id: string) {
    let docRef: DocumentReference = fs.collection("organization").doc(id);
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
