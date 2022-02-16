import { createStore } from "vuex";
import { user } from "@/store/user";
import { project } from "@/store/project";
import { editor } from "@/store/editor";
import { submission } from "@/store/submission";
import { submitter } from "@/store/submitter";

export default createStore({
  modules: { user, project, editor, submission, submitter },
});
