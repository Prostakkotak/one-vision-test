<template>
  <section class="stocks">
    <div class="stocks__markup stocks__markup_heading">
      <div class="stocks__name"></div>
      <div class="stocks__name"><span>ZIP</span></div>
      <div class="stocks__name">
        <span>Period Sales</span>
      </div>
      <div class="stocks__name">
        <span>LY Period Sales</span>
      </div>
      <div class="stocks__name">
        <span>Sales Change</span>
      </div>
      <div class="stocks__name">
        <span>Period Share</span>
      </div>
      <div class="stocks__name">
        <span>LY Period Share</span>
      </div>
      <div class="stocks__name">
        <span>YOY Share Change</span>
      </div>
    </div>
    <ol class="stocks__list">
      <StockItem v-for="stock in stocks.data" :key="stock.zipcode" :stockData="stock" />
    </ol>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import StockItem from "./StockItem.vue";

export default {
  props: ['stocksList'],
  data: () => ({
  }),
  components: {
    StockItem,
  },
  computed: {
    ...mapGetters(['stocks'])
  },
};
</script>

<style lang="scss">
.stocks {
  max-width: 1100px;
  margin: 0 auto;

  &__list {
    counter-reset: listCounter;
  }

  &__item {
    position: relative;
    border-radius: 12px;
    background-color: rgba(#fff, 0.1);
    transition: 200ms;

    &:nth-child(2n) {
      background-color: transparent;
    }

    &::before {
      counter-increment: listCounter;
      content: counter(listCounter);

      position: absolute;
      top: 50%;
      left: 16px;

      transform: translate(0, -50%);
    }

    &:hover {
      background-color: rgba(#fff, 0.2);
      transform: scale(1.01);
      cursor: pointer;
    }
  }

  &__markup {
    display: grid;
    grid-template-columns: 1.5fr 4fr 1fr 2fr 1fr 1fr 2fr 1fr;
    align-items: center;

    &_heading {
      margin-bottom: 30px;
    }
  }

  &__name,
  &__value {
    line-height: 17px;
    font-size: 14px;
    font-weight: 500;

    &_region {
      font-size: .85rem;
      color: rgba(#fff, 0.4);
    }

    &_positive {
      color: #3cbf73;

      &::after {
        content: "▲";
        font-size: 10px;
      }
    }

    &_negative {
      color: #fe2b5c;

      &::after {
        content: "▼";
        font-size: 10px;
      }
    }

    &_neutral {
      opacity: .6;
    }
  }

  &__name > span {
    max-width: 10ch;
    display: inline-block;
  }

  &__value {
    padding: 15px 0;
  }
}
</style>