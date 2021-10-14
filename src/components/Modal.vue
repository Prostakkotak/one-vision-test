<template>
  <transition name="fade">
    <div
      :class="{ modal: true, modal_mapmode: $store.getters.mapMode }"
      :style="getModalPos()"
      @click="checkMapMode()"
    >
      <header class="modal__header">
        <h2 class="modal__zip">{{ modalData.zipcode }}</h2>
        <p class="modal__region">{{ modalData.region }}</p>
      </header>
      <main class="modal__main">
        <p class="modal__total-sales">Total: {{ modalData.total }}</p>
        <ol class="modal__list">
          <li
            v-for="(competitor, index) in orderedCompetitors"
            :key="index"
            class="modal__item"
          >
            <span
              class="modal__circle-decorator"
              :style="{
                'background-color': indexColor(index, competitor.name),
              }"
            ></span>
            <span :style="{ color: clientColorSet(competitor.name) }"
              >{{ competitor.name }}:
            </span>
            {{ competitor.sales }}
          </li>
        </ol>
      </main>
      <footer class="modal__footer">
        <p class="modal__other-sales">Other: {{ otherSales }}</p>
        <a href="#" class="modal__link-button">Dealer</a>
      </footer>
      <button class="modal__close-button" @click="onClose">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L13 13" stroke="white" stroke-width="2" />
          <path d="M1 13.0001L13 1.25012" stroke="white" stroke-width="2" />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script>
import _ from "lodash";

export default {
  props: ["modalData"],
  computed: {
    orderedCompetitors() {
      /* Клонируем массив и добавляем продажи нашего клиента */
      let competitorsClone = [...this.modalData.competitors];
      competitorsClone.push({
        name: "Your dealership",
        sales: this.modalData.sales,
      });

      return _.orderBy(competitorsClone, "sales").reverse();
    },
    otherSales() {
      let otherSales = 0;

      for (let i = 0; i < this.modalData.competitors.length; i++) {
        otherSales += this.modalData.competitors[i].sales;
      }

      otherSales += this.modalData.sales;

      return this.modalData.total - otherSales;
    },
  },
  methods: {
    onClose() {
      this.$store.commit("setModalOpenState", false);
      this.$store.commit("setModalData", {});
    },
    indexColor(index, name) {
      if (name != "Your dealership") {
        return this.$store.getters.colors[index];
      } else {
        return "#F38C2C";
      }
    },
    clientColorSet(name) {
      if (name === "Your dealership") {
        return "#F38C2C";
      }
    },
    getModalPos() {
      if (this.$store.getters.mapMode && this.$store.getters.modalOpenState) {
        let obj = this.$store.getters.mousePos

        let modalWidth = document.getElementsByClassName('modal')[0].offsetWidth;
        let modalHeight = document.getElementsByClassName('modal')[0].offsetHeight;
        

        return {
          left: obj.x + (modalWidth/2 + 35) + "px",
          top: obj.y + (modalHeight/2 - 35) + "px"
        }
      }
    },
    checkMapMode() {
      if (this.$store.getters.mapMode) {
        this.onClose()
      }
    }
  },
};
</script>

<style lang="scss">
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;

  min-width: 400px;

  padding: 32px 24px;

  border-radius: 12px;
  background-color: rgba(#3f4042, 1);
  box-shadow: 0px 24px 96px 0px rgba(0, 0, 0, 0.24);

  &__close-button {
    position: absolute;
    top: 23px;
    right: 23px;

    padding: 14px 18px;

    border-radius: 12px;
    border: 1px solid rgba(#fff, 0.1);
    background-color: transparent;
    cursor: pointer;
    transition: 200ms;

    &:hover {
      background-color: rgba(#fff, 0.2);
    }

    &:active {
      transform: scale(0.9);
    }

    > svg {
      display: block;
    }
  }

  &__header {
    margin-bottom: 15px;
  }

  &__zip {
    font-size: 24px;
    margin-bottom: 4px;
  }

  &__region {
    font-size: 14px;
    opacity: 0.4;
  }

  &__main {
    padding: 12px 0;
    margin: 15px 0 20px 0;

    border-top: 1px solid rgba(#fff, 0.1);
    border-bottom: 1px solid rgba(#fff, 0.1);
  }

  &__total-sales {
    font-size: 16px;
  }

  &__list {
    padding-left: 50px;
    list-style: decimal;
  }

  &__item {
    margin: 20px 0;

    &.orange {
      color: #f38c2c;
    }
  }

  &__circle-decorator {
    display: inline-block;
    margin: 0 7px;
    width: 13px;
    height: 13px;

    border-radius: 100%;

    &.orange {
      color: #f38c2c;
    }
  }

  &__other-sales {
    font-size: 16px;
    margin-bottom: 20px;
  }

  &__link-button {
    display: inline-block;

    padding: 20px 25px;

    text-decoration: none;
    border-radius: 12px;
    transition: 200ms;

    background-color: #f38c2c;
    color: #fff;

    &:hover {
      background-color: lighten($color: #f38c2c, $amount: 6);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>