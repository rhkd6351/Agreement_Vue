import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import VueCookies from "vue-cookies";

createApp(App).use(router).use(store).mount("#app");
