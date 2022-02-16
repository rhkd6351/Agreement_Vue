import { createStore } from "vuex";
import { user } from "@/store/user";
import { project } from "@/store/project";
import { editor } from "@/store/editor";
import { submission } from "@/store/submission";

export default createStore({
  modules: { user, project, editor, submission },
});
