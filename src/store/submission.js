import { getSubmission } from "@/api/submissionAPI";

const submission = {
  state: {
    submitted_project: {},
    text_objects: [],
    checkbox_objects: [],
    sign_objects: [],
    add_count: 0,
  },

  mutations: {
    SET_SUBMITTED_PROJECT(state, project) {
      state.submitted_project = project;
    },

    SET_SUBMISSION_TEXT_OBJECTS(state, textObjects) {
      textObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
      });
      state.text_objects = textObjects;
    },
    SET_SUBMISSION_CHECKBOX_OBJECTS(state, checkboxObjects) {
      checkboxObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
      });
      state.checkbox_objects = checkboxObjects;
    },
    SET_SUBMISSION_SIGN_OBJECTS(state, signObjects) {
      signObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
      });
      state.sign_objects = signObjects;
    },

    UPDATE_SUBMISSION_TEXT_OBJECT(state, textObject) {
      for (let i = 0; i < state.text_objects.length; i++) {
        if (textObject.local_idx == state.text_objects[i].local_idx) {
          state.text_objects.splice(i, 1, textObject);
          return;
        }
      }
    },
    UPDATE_SUBMISSION_CHECKBOX_OBJECT(state, checkboxObject) {
      for (let i = 0; i < state.checkbox_objects.length; i++) {
        if (checkboxObject.local_idx == state.checkbox_objects[i].local_idx) {
          state.checkbox_objects.splice(i, 1, checkboxObject);
          return;
        }
      }
    },
    UPDATE_SUBMISSION_SIGN_OBJECT(state, signObject) {
      for (let i = 0; i < state.sign_objects.length; i++) {
        if (signObject.local_idx == state.sign_objects[i].local_idx) {
          state.sign_objects.splice(i, 1, signObject);
          return;
        }
      }
    },
    INITIALIZE_SUBMISSION(state) {
      state.submitted_project = {};
      state.text_objects = [];
      state.checkbox_objects = [];
      state.sign_objects = [];
      state.add_count = 0;
    },
  },
  actions: {
    async fetchSubmission(context, submissionName) {
      return new Promise((resolve, reject) => {
        getSubmission(submissionName)
          .then((res) => {
            const data = res.data;
            context.commit("SET_SUBMITTED_PROJECT", data);
            context.commit(
              "SET_SUBMISSION_TEXT_OBJECTS",
              data.submittee_object_texts
            );
            context.commit(
              "SET_SUBMISSION_CHECKBOX_OBJECTS",
              data.submittee_object_checkboxes
            );
            context.commit(
              "SET_SUBMISSION_SIGN_OBJECTS",
              data.submittee_object_signs
            );

            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};

export { submission };
