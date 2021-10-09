<template>
  <transition name="fade">
    <div class="modal">
      <header class="modal__header">
        <h2 class="modal__zip">20960</h2>
        <p class="modal__region">Laurelm Prince George's County, MD</p>
      </header>
      <main class="modal__main">
        <p class="modal__total-sales">Total: 426</p>
        <ol class="modal__list">
            
          <li v-for="(competitor, index) in competitors" :key="index" class="modal__item">
            <span class="modal__circle-decorator">&#9677;</span>{{competitor.name}}: {{competitor.sales}}
          </li>
        </ol>
      </main>
      <footer class="modal__footer">
        <p class="modal__other-sales">Other: 259</p>
        <a href="#" class="modal__link-button">Dealer</a>
      </footer>
      <button class="modal__close-button" @click="$store.commit('setModalOpenState', false)">
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
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['competitors'])
    }
}
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
        background-color: rgba(#fff, .2);
    }

    &:active {
        transform: scale(0.9);
    }

    >svg {
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
  }

  &__circle-decorator {
    display: inline-block;
    margin: 0 7px;
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