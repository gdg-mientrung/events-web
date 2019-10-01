import { UserInfo, Query, QuerySnapshot } from "firebase/firebase-firestore";
import { fa, fs } from "./firebase";

export default context => {
  const { store, redirect } = context;
  return new Promise((resolve, reject) => {
    fa.onAuthStateChanged(async user => {
      if (user != null && user.providerData[0] != null) {
        const userInfo: UserInfo = user.providerData[0];
        return resolve(store.commit("userInfo/SET_USER_INFO", userInfo));
      }
      return resolve(store.commit("userInfo/REMOVE_USER_INFO"));
    });
  });
};
