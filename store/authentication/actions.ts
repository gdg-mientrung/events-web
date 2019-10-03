import { RootState } from "store";
import { ActionContext, ActionTree } from "vuex";
import { AuthenticationAlertsState } from "./state";
import { UserInfo, Query, QuerySnapshot } from "firebase/firebase-firestore";
import { GoogleProvider, fa, fs } from "~/plugins/firebase";

export interface Actions<S, R> extends ActionTree<S, R> {
  login(context: ActionContext<S, R>, id: string): Promise<boolean>;
}

async function isAdmin(
  userCredential: firebase.auth.UserCredential
): Promise<boolean> {
  if (userCredential != null && userCredential.user != null) {
    const user: firebase.User = userCredential.user;
    const ref: Query = fs.collection("admin_ids").doc(user.uid);
    const snap: QuerySnapshot = await ref.get();
    const isAdmin: boolean = snap.data() !== undefined;
    return isAdmin;
  }
  return false;
}

const actions: Actions<AuthenticationAlertsState, RootState> = {
  async login({ commit, state }, id: string): Promise<boolean> {
    commit("authenticationAlerts/SET_ERROR_ALERT", "", { root: true });
    try {
      const userCredential: firebase.auth.UserCredential = await fa.signInWithPopup(
        GoogleProvider
      );
      if (userCredential.credential != null) {
        if (await isAdmin(userCredential)) {
          return true;
        } else {
          await fa.signOut();
          commit(
            "authenticationAlerts/SET_ERROR_ALERT",
            "You don't have authorization. Please login again",
            { root: true }
          );
          return false;
        }
      }
    } catch (e) {
      var errorCode = e.code;
      var errorMessage = e.message;
      var email = e.email;
      var credential = e.credential;
    }
    return false;
  }
};

export default actions;
