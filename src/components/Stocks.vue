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
      <StockItem />
      <StockItem />
      <StockItem />
      <StockItem />
      <StockItem />
      <StockItem />
    </ol>
  </section>
</template>

<script>
import StockItem from "./StockItem.vue";

export default {
  components: {
    StockItem,
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
  }

  &__markup {
    display: grid;
    grid-template-columns: 1.5fr 4fr 1fr 2fr 1fr 1fr 2fr 1fr;

    &_heading {
      margin-bottom: 30px;
    }
  }

  &__name,
  &__value {
    line-height: 17px;
    font-size: 14px;
    font-weight: 500;

    &_zip {
      color: rgba(#fff, 0.4);
    }

    &_positive {
      color: #3cbf73;

      &::before {
        content: "▲";
        font-size: 10px;
        margin-right: 8px;
      }
    }

    &_negative {
        color: #FE2B5C;

        &::after {
            content: "▼";
        font-size: 10px;
        margin-left: 8px;
        }
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