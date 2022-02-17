import { getProject, getSubmitteeProject, postSubmitteeProject, saveObjects, changeTitle } from "../api/projectAPI";

const editor = {
  state: {
    editing_project: {},
    text_objects: [],
    checkbox_objects: [],
    sign_objects: [],
    add_mode: "",
    add_count: 0,
    sign_dialog_show: false,
    sign_dialog_data: "",
    zoom: 100,
  },

  getters: {},

  mutations: {
    SET_ZOOM(state, zoom) {
      state.zoom = zoom;
    },

    SET_EDITING_PROJECT(state, project) {
      state.editing_project = project;
    },
    SET_ADD_MODE(state, mode) {
      state.add_mode = mode;
    },

    SET_TEXT_OBJECTS(state, textObjects) {
      textObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
      });
      state.text_objects = textObjects;
    },
    SET_CHECKBOX_OBJECTS(state, checkboxObjects) {
      checkboxObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
      });
      state.checkbox_objects = checkboxObjects;
    },

    SET_SIGN_OBJECTS(state, signObjects) {
      signObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
      });
      state.sign_objects = signObjects;
    },
    SET_SIGN_DIALOG_DATA(state, signObject){
      state.sign_dialog_data = signObject;
    },

    SET_TEXT_OBJECTS_FOR_WRITING(state, textObjects) {
      textObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
        em.context = "";
      });
      state.text_objects = textObjects;
    },

    SET_CHECKBOX_OBJECTS_FOR_WRITING(state, checkboxObjects) {
      checkboxObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
        em.checked = false;
      });
      state.checkbox_objects = checkboxObjects;
    },

    SET_SIGN_OBJECTS_FOR_WRITING(state, signObjects) {
      signObjects.map((em) => {
        state.add_count += 1;
        em.local_idx = state.add_count;
      });
      state.sign_objects = signObjects;
    },

    ADD_TEXT_OBJECT(state, textObject) {
      state.add_count += 1;
      textObject.local_idx = state.add_count;
      textObject.name += `_${state.add_count}`;
      state.text_objects.push(textObject);
    },
    ADD_CHECKBOX_OBJECT(state, checkboxObject) {
      state.add_count += 1;
      checkboxObject.local_idx = state.add_count;
      checkboxObject.name += `_${state.add_count}`;
      state.checkbox_objects.push(checkboxObject);
    },
    ADD_SIGN_OBJECT(state, signObject) {
      state.add_count += 1;
      signObject.local_idx = state.add_count;
      signObject.name += `_${state.add_count}`;
      state.sign_objects.push(signObject);
    },

    UPDATE_TEXT_OBJECT(state, textObject) {
      for (let i = 0; i < state.text_objects.length; i++) {
        if (textObject.local_idx == state.text_objects[i].local_idx) {
          state.text_objects.splice(i, 1, textObject);
          return;
        }
      }
    },
    UPDATE_CHECKBOX_OBJECT(state, checkboxObject) {
      for (let i = 0; i < state.checkbox_objects.length; i++) {
        if (checkboxObject.local_idx == state.checkbox_objects[i].local_idx) {
          state.checkbox_objects.splice(i, 1, checkboxObject);
          return;
        }
      }
    },
    UPDATE_SIGN_OBJECT(state, signObject) {
      for (let i = 0; i < state.sign_objects.length; i++) {
        if (signObject.local_idx == state.sign_objects[i].local_idx) {
          state.sign_objects.splice(i, 1, signObject);
          return;
        }
      }
    },

    UPDATE_PROJECT_TITLE(state, title) {
      state.editing_project.title = title;
    },

    DELETE_TEXT_OBJECT(state, textObject) {
      for (let i = 0; i < state.text_objects.length; i++) {
        if (textObject.local_idx == state.text_objects[i].local_idx) {
          state.text_objects.splice(i, 1);
          return;
        }
      }
    },

    DELETE_CHECKBOX_OBJECT(state, checkboxObject) {
      for (let i = 0; i < state.checkbox_objects.length; i++) {
        if (checkboxObject.local_idx == state.checkbox_objects[i].local_idx) {
          state.checkbox_objects.splice(i, 1);
          return;
        }
      }
    },

    DELETE_SIGN_OBJECT(state, signObject) {
      for (let i = 0; i < state.sign_objects.length; i++) {
        if (signObject.local_idx == state.sign_objects[i].local_idx) {
          state.sign_objects.splice(i, 1);
          return;
        }
      }
    },

    INITIALIZE_OBJECTS(state) {
      state.editing_project = {};
      state.text_objects = [];
      state.checkbox_objects = [];
      state.sign_objects = [];
      state.add_mode = "";
      state.add_count = 0;
    },
  },

  actions: {
    async fetchProject(context, projectName) {
      return new Promise((resolve, reject) => {
        getProject(projectName)
          .then((res) => {
            const data = res.data;
            context.commit("SET_EDITING_PROJECT", data);
            context.commit("SET_TEXT_OBJECTS", data.project_object_texts);
            context.commit(
              "SET_CHECKBOX_OBJECTS",
              data.project_object_checkboxes
            );
            context.commit("SET_SIGN_OBJECTS", data.project_object_signs);

            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async fetchSubmitterProject(context, projectName) {
      return new Promise((resolve, reject) => {
        getSubmitteeProject(projectName)
          .then((res) => {
            const data = res.data;
            context.commit("SET_EDITING_PROJECT", data);
            context.commit("SET_TEXT_OBJECTS_FOR_WRITING", data.project_object_texts);
            context.commit(
              "SET_CHECKBOX_OBJECTS_FOR_WRITING",
              data.project_object_checkboxes
            );
            context.commit("SET_SIGN_OBJECTS_FOR_WRITING", data.project_object_signs);

            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    addNewObject(context, { type, page, position }) {
      switch (type) {
        case "text":
          context.commit("ADD_TEXT_OBJECT", {
            color: "#000000",
            font_size: 14,
            height: 100,
            name: "새 텍스트",
            object_type: "OBJECT_TYPE_TEXT",
            page: page,
            rotate: 0,
            type: "LONG_TEXT",
            width: 100,
            x_position: position.x_position - 50,
            y_position: position.y_position - 50,
          });
          break;
        case "checkbox":
          context.commit("ADD_CHECKBOX_OBJECT", {
            color: "#000000",
            height: 33,
            name: "새 체크박스",
            object_type: "OBJECT_TYPE_CHECKBOX",
            page: page,
            rotate: 0,
            type: "DEFAULT",
            width: 33,
            x_position: position.x_position - 16,
            y_position: position.y_position - 16,
          });
          break;
        case "sign":
          context.commit("ADD_SIGN_OBJECT", {
            color: "#000000",
            height: 100,
            name: "새 서명",
            object_type: "OBJECT_TYPE_SIGN",
            page: page,
            rotate: 0,
            type: "DEFAULT",
            width: 100,
            x_position: position.x_position - 50,
            y_position: position.y_position - 50,
          });
          break;
      }
    },

    async saveData(context) {
      return await new Promise((resolve, reject) => {
        saveObjects(context.state.editing_project.name, {
          text_objects: context.state.text_objects,
          checkbox_objects: context.state.checkbox_objects,
          sign_objects: context.state.sign_objects,
        })
          .then((res) => {
            changeTitle(
              context.state.editing_project.name,
              context.state.editing_project.title
            ).then((res2) => {
              resolve(res);
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async saveSubmitteData(context, {submitter, files, filesName}) {
      return await new Promise((resolve, reject) => {
        let jsonData =
        {
          student_name: submitter.name,
          student_id: submitter.school_id,
          submittee_object_texts: context.state.text_objects,
          submittee_object_checkboxes: context.state.checkbox_objects,
          submittee_object_signs: context.state.sign_objects,
        }
        console.log(jsonData);
        console.log(filesName);
        console.log(context.state.editing_project.pdf.url);
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
        let blob = fetch("https://junggam.click" + context.state.editing_project.pdf.url).then(r => r.blob());
        form.append(
          'file_pdf',
          blob,
          context.state.editing_project.title + '.pdf'
        );
        /*
        fetch("https://junggam.click" + context.state.editing_project.pdf.url) 
          .then(r => r.blob())
          .then(blob => {
              let file_object = new Blob([blob], {type: 'application/pdf'});
              console.log(file_object); //Output
              form.append(
                'file_pdf',
                file_object,
                context.state.editing_project.title + '.pdf'
              );
          }
        );
        */
        /*
        let pdf_file = new Blob(["https://junggam.click" + context.state.editing_project.pdf.url], {type: 'application/pdf'});
        form.append(
          'file_pdf',
          pdf_file,
          context.state.editing_project.title + '.pdf'
        );
        */
        postSubmitteeProject(context.state.editing_project.name, form)
          .then((res) => {
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

export { editor };
