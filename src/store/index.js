import { createStore } from "vuex";
import { user } from "@/store/user";
import { project } from "@/store/project";

export default createStore({
  modules: { user, project },
});
