<template>
    <li class="stocks__item">
        <div class="stocks__markup">
          <div class="stocks__value"></div>
          <div class="stocks__value">{{stockData.zipcode}} <span class="stocks__value_zip">({{stockData.region}})</span></div>
          <div class="stocks__value">{{stockData.sales}}</div>
          <div class="stocks__value">{{stockData.lastYear}}</div>
          <div class="stocks__value stocks__value_positive">{{stockData.total}}</div>
          <div class="stocks__value">{{stockData.lastYearTotal}}</div>
          <div class="stocks__value"></div>
          <div class="stocks__value stocks__value_negative">-0.04</div>
        </div>
      </li>
</template>

<script>
export default {
    props: ['stockData'],
}
</script>