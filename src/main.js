import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import components from "./components";
import "./style/main.scss";

const app = createApp(App).use(createPinia());
Object.keys(components).forEach((key) => {
  (key) => app.component(key, components[key]);
});

app.mount("#app");
