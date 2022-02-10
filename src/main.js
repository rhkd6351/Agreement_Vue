import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "2h",
  path: "/",
  domain: "",
});

createApp(App).use(router).use(store).mount("#app");
