<template>
  <li class="stocks__item">
    <div class="stocks__markup">
      <div class="stocks__value"></div>
      <div class="stocks__value">
        {{ stockData.zipcode }}
        <span class="stocks__value_region">({{ stockData.region }})</span>
      </div>
      <div class="stocks__value">{{ stockData.sales }}</div>
      <div class="stocks__value">{{ stockData.lastYear }}</div>
      <div
        :class="{
          stocks__value: true,
          stocks__value_neutral: salesChange == 0,
          stocks__value_positive: isPositive(salesChange) && salesChange != 0,
          stocks__value_negative: !isPositive(salesChange) && salesChange != 0,
        }"
      >
        {{ salesChange }}
      </div>
      <div class="stocks__value">{{ periodShare }}%</div>
      <div class="stocks__value">{{ lyPeriodShare }}%</div>
      <div
        :class="{
          stocks__value: true,
          stocks__value_neutral: yoyShareChange == 0,
          stocks__value_positive:
            isPositive(yoyShareChange) && yoyShareChange != 0,
          stocks__value_negative:
            !isPositive(yoyShareChange) && yoyShareChange != 0,
        }"
      >
        {{ yoyShareChange }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["stockData"],
  data: () => ({
    salesChange: "",
    periodShare: "",
    lyPeriodShare: "",
    yoyShareChange: "",
  }),
  mounted() {
    this.salesChange = +this.stockData.sales - +this.stockData.lastYear;
    this.periodShare = this.countPeriodShare(
      this.stockData.sales,
      this.stockData.total
    );
    this.lyPeriodShare = this.countPeriodShare(
      this.stockData.lastYear,
      this.stockData.lastYearTotal
    );
    this.yoyShareChange = this.reduction(this.periodShare - this.lyPeriodShare);
  },
  methods: {
    countPeriodShare(sales, total) {
      return this.reduction((+sales / +total) * 100);
    },
    reduction(num) {
      return Math.ceil(num * 100) / 100;
    },
    isPositive(num) {
      if (num < 0) return false;
      return true;
    },
  },
};
</script>