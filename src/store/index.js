import { createStore } from "vuex";
import { user } from "@/store/user";
import { project } from "@/store/project";
import { editor } from "@/store/editor";

export default createStore({
  modules: { user, project, editor },
});
