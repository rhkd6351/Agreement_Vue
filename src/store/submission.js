import { getSubmission } from "@/api/submissionAPI";
import { getSubmitteeProject, postSubmitteeProject } from "../api/projectAPI";

const submission = {
  state: {
    submitted_project: {},
    text_objects: [],
    checkbox_objects: [],
    sign_objects: [],
    sign_url_save_file: [],
    add_count: 0,
    sign_dialog_show: false,
    sign_dialog_data: "",
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

    SET_SUBMISSION_SIGN_DIALOG_DATA(state, signObject){
      state.sign_dialog_data = signObject;
    },

    SAVE_SUBMISSION_SIGN_URL_DATA(state, {signObjectName, url}){
      let signUrlObject = {
        signObjectName: signObjectName,
        url: url
      }
      state.sign_url_save_file.push(signUrlObject);
      console.log(state.sign_url_save_file);
    },

    SET_SUBMISSION_TEXT_OBJECTS_FOR_WRITING(state, textObjects) {
      textObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
        delete em.project;
        em.content = "";
      });
      state.text_objects = textObjects;
    },

    SET_SUBMISSION_CHECKBOX_OBJECTS_FOR_WRITING(state, checkboxObjects) {
      checkboxObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
        delete em.project;
        em.checked = false;
      });
      state.checkbox_objects = checkboxObjects;
    },

    SET_SUBMISSION_SIGN_OBJECTS_FOR_WRITING(state, signObjects) {
      signObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
        delete em.project;
        em.url = "";
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
    async fetchSubmitterProject(context, projectName) {
      return new Promise((resolve, reject) => {
        getSubmitteeProject(projectName)
          .then((res) => {
            const data = res.data;
            context.commit("SET_SUBMITTED_PROJECT", data);
            context.commit("SET_SUBMISSION_TEXT_OBJECTS_FOR_WRITING", data.project_object_texts);
            context.commit("SET_SUBMISSION_CHECKBOX_OBJECTS_FOR_WRITING", data.project_object_checkboxes);
            context.commit("SET_SUBMISSION_SIGN_OBJECTS_FOR_WRITING", data.project_object_signs);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
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
    async saveSubmitteData(context, {submitter, files, filesName, pdfData}) {
      return await new Promise((resolve, reject) => {
        let jsonData =
        {
          student_name: submitter.name,
          student_id: Number(submitter.school_id),
          submittee_object_texts: context.state.text_objects,
          submittee_object_checkboxes: context.state.checkbox_objects,
          submittee_object_signs: context.state.sign_objects,
        }
        let form = new FormData();
        let jsonBlob = new Blob(
          [JSON.stringify(jsonData)],
          {type: 'application/json'}
        );
        form.append('data', jsonBlob);
        for (let count = 0; count < files.length; count++) {
          //이미지가 여러개이므로 각각의 이미지와 이미지의 이름을 잡아서 넣어준다.
          let imageBlob = new Blob([files[count]], {type: 'image/png'});
          form.append('sign_img', imageBlob, filesName[count] + '.png');
        }
        let pdf_file = new Blob([pdfData.output('blob')], {type: 'application/pdf'});
        form.append(
          'file_pdf',
          pdf_file,
          context.state.submitted_project.title + '.pdf'
        );
        postSubmitteeProject(context.state.submitted_project.name, form)
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    }
  },
};

export { submission };
