import { fa } from "./firebase";

export default context => {
  const { store, redirect } = context;
  return new Promise((resolve, reject) => {
    fa.onAuthStateChanged(user => {
      if (user) {
        return resolve(
          store.commit("userInfo/SET_USER_INFO", user.providerData[0])
        );
      }
      return resolve();
    });
  });
};
