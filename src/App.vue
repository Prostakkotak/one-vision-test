<template>
  <div id="app">
    <Header />
    <main class="main">
      <Stocks :stocksList="stocksJSON" />
      <Map :apiKey="apiKey" />
      <Modal
       v-show="$store.getters.modalOpenState"
       :modalData="$store.getters.modalData"
      />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Stocks from "./components/Stocks.vue";
import Modal from './components/Modal.vue';
import Map from './components/Map.vue';
import store from "./store";
import axios from "axios";
import { mapGetters } from 'vuex';

const ax = axios.create({
  baseURL: "http://localhost:8080/",
});
export default {
  name: "App",
  data: () => ({
    stocksJSON: "",
    isModalOpen: false,
    apiKey: 'KEY',
  }),
  computed: {
    ...mapGetters(['modalOpenState', 'modalData'])
  },
  methods: {
    onModalOpen(data) {
      alert('open')
      alert(data)
      this.isModalOpen = true
    }
  },
  components: {
    Header,
    Stocks,
    Modal,
    Map
  },
  store: store,
  mounted() {
    ax.get("static/json.txt", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response = JSON.stringify(response);

        this.stocksJSON = JSON.parse(response);
        this.$store.commit("setStocks", JSON.parse(response));
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

body {
  background-color: #2e2f32;
  color: #fff;
  font-family: Helvetica, sans-serif;
}

.main {
  margin-top: 100px;
}
</style>