<template>
  <div>
    <div class="gmap__popup" id="popup-test">TESTO</div>
    <div id="map" class="gmap" v-show="isMapReady"></div>
  </div>
</template>

<script>
import $Scriptjs from "scriptjs";
import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost:8080/",
});

export default {
  name: "Map",
  props: {
    apiKey: String,
  },
  data: () => ({
    map: null,
    boundariesList: [],
    isMapReady: false,
  }),
  mounted() {
    $Scriptjs(
      `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`,
      () => {
        this.initMap();
      }
    );
    document.getElementById("map").addEventListener("click", (e) => {
      if (this.$store.getters.modalOpenState && this.$store.getters.mapMode) {
        this.$store.commit("setMousePos", {
          x: e.pageX,
          y: e.pageY,
        });
      }
    });
  },
  methods: {
    initMap() {
      /* MAP INITIALIZATION */
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 40.44179977358717, lng: -79.99732507758472 },
        styles: this.$store.getters.mapSettings,
        disableDefaultUI: true,
        clickableIcons: false,
        disableDoubleClickZoom: true,
      });

      ax.get("static/pn.json", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          // Как только файл догрузился, кидаем его в store и запускаем отрисовку полигонов
          this.$store.commit("setBoundaries", response.data);

          this.getBoundaries();

          this.map.data.addGeoJson({
            type: "FeatureCollection",
            features: this.boundariesList,
          });

          this.map.data.setStyle((feature) => ({
            // Выставляем цвета полигонов согласно св-ву color
            fillColor: feature.getProperty("color"),
            strokeColor: feature.getProperty("color"),
            strokeWeight: 2,
          }));

          this.map.data.addListener("click", (event) => {
            let zipcode = event.feature.getProperty("ZCTA5CE10");
            let stocks = this.$store.getters.stocks.data;

            if (zipcode != this.$store.getters.modalData.zipcode) {
              for (let i = 0; i < stocks.length; i++) {
                if (stocks[i].zipcode === zipcode) {
                  this.$store.dispatch("openModal", {
                    modalData: stocks[i],
                    modalOpenState: true,
                    mapMode: true,
                  });
                  break;
                }
              }
            } else {
              this.$store.commit("setModalOpenState", false);
              this.$store.commit("setModalData", {});
            }
          });
          this.map.data.addListener("mouseover", (event) => {
            this.map.data.revertStyle();
            this.map.data.overrideStyle(event.feature, { strokeWeight: 8 });
          });
          this.map.data.addListener("mouseout", () => {
            this.map.data.revertStyle();
          });

          this.isMapReady = true; // Когда все загружено и отрисовано - показываем карту
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getBoundaries() {
      // Получаем список координат полигонов исходя из списка с zip кодами

      let obj = this.$store.getters.stocks.data; // ОБъект продаж по регионам
      let zipcodes = [];

      for (let j = 0; j < obj.length; j++) {
        // Вытягиваем список zip кодов из obj
        zipcodes.push(obj[j].zipcode);
      }

      obj = this.$store.getters.boundaries.features; // Переназначаем obj на список регионов штата
      let counter = 0;
      for (let i = 0; i < obj.length; i++) {
        // Проходимся по списку регионов, если zip есть в zipcodes то добавляем в список полигонов
        if (zipcodes.includes(obj[i].properties["ZCTA5CE10"])) {
          obj[i]["properties"]["color"] = this.$store.getters.colors[counter];
          counter++; // Выставляем цвет из списка и увеличиваем счетчик
          this.boundariesList.push(obj[i]);
        }
      }
    } /* 
    getMousePos(event) {
        console.log(event)
        return {
            "x": event["pageX"],
            "y": event["pageY"]
        }
    }, */,
    /* attachPolygonInfoWindow(polygon) {
      var infoWindow = new window.google.maps.InfoWindow();
      window.google.maps.event.addListener(polygon, "mouseover", function (e) {
        infoWindow.setContent("Polygon Name");
        var latLng = e.latLng;
        infoWindow.setPosition(latLng);
        infoWindow.open(this.map);
      });
    }, */
  },
};
</script>

<style lang="scss">
.gmap {
  margin: 100px 0;
  height: 800px;

  &__popup {
    position: fixed;
  }
}
</style>