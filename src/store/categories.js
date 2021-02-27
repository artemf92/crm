import firebase from 'firebase';

export default {
  actions: {
    async categoryCreate({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUserId');
        const category = await firebase.database().ref(`users/${uid}/categories`).push({ title, limit });
        return { id: category.key, title, limit };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserId');
        const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {};
        return Object.keys(categories).map((c) => ({ ...categories[c], id: c }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const uid = await dispatch('getUserId');
        await firebase.database().ref(`users/${uid}/categories`).child(id).update({ title, limit });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async delCategory({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUserId');
        return await firebase.database().ref(`users/${uid}/categories`).child(id).remove();
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
