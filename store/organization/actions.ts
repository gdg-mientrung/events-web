import { plainToClass } from "class-transformer";
import {
  DocumentReference,
  QuerySnapshot,
  CollectionReference
} from "firebase/firebase-firestore";
import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { Organization } from "~/modals";
import { fs } from "~/plugins/firebase";
import { OrganizationState } from "./state";
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
  fetchOrganization(
    context: ActionContext<S, R>,
    { typeId, id }: { typeId: string; id: string }
  ): void;
  updateOrganization(
    context: ActionContext<S, R>,
    {
      typeId,
      id,
      organization
    }: { typeId: string; id: string; organization: Organization }
  ): void;
  createOrganization(
    context: ActionContext<S, R>,
    { typeId, organization }: { typeId: string; organization: Organization }
  ): Promise<string>;
  deleteOrganization(
    context: ActionContext<S, R>,
    { typeId, id }: { typeId: string; id: string }
  ): Promise<boolean>;
}

const actions: Actions<OrganizationState, RootState> = {
  async fetchOrganization(
    { commit, state },
    { id, typeId }: { typeId: string; id: string }
  ) {
    let docRef: DocumentReference = fs
      .collection("organization")
      .doc(typeId)
      .collection("organizations")
      .doc(id);
    try {
      commit(FETCH_START);
      let snap: QuerySnapshot = await docRef.get();
      let organization: Organization = snap.data();
      commit(FETCH_END, organization);
    } catch (e) {
      console.error(e);
    }
  },
  async updateOrganization(
    { commit },
    {
      typeId,
      id,
      organization
    }: { typeId: string; id: string; organization: Organization }
  ) {
    let docRef: DocumentReference = fs
      .collection("organization")
      .doc(typeId)
      .collection("organizations")
      .doc(id);
    try {
      commit(UPDATE_START);
      await docRef.update(organization);
      commit(UPDATE_END, organization);
    } catch (e) {
      console.error(e);
    }
  },
  async createOrganization(
    { commit },
    { typeId, organization }: { typeId: string; organization: Organization }
  ): Promise<string> {
    let colRef: CollectionReference = fs
      .collection("organization")
      .doc(typeId)
      .collection("organizations");
    try {
      commit(CREATE_START);
      let docRef: DocumentReference = await colRef.add(organization);
      commit(CREATE_END, organization);
      return docRef.id;
    } catch (e) {
      console.error(e);
    }
    return "";
  },
  async deleteOrganization(
    { commit },
    { typeId, id }: { typeId: string; id: string }
  ) {
    let docRef: DocumentReference = fs
      .collection("organization")
      .doc(typeId)
      .collection("organizations")
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
