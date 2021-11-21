import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./app.vue";
import { apolloClient } from "./plugins/apollo";

const app = createApp({
  setup() {
    // https://v4.apollo.vuejs.org/guide-composable/setup.html#vue-3
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.mount("#app");
