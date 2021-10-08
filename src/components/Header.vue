<template>
    <header class="header">
        <div class="header__logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <nav class="header__nav">
            <ul class="header__menu">
                <li class="header__item"><a href="" class="header__link">Real Time Cashflow</a></li>
                <li class="header__item"><a href="" class="header__link">Planner</a></li>
                <li class="header__item"><a href="" class="header__link">Budget</a></li>
                <li class="header__item"><a href="" class="header__link">Analytics: <span class="header__link_orange">Market Share</span></a></li>
            </ul>
        </nav>
        <a href="#" class="header__settings"><img src="../assets/settings.svg" alt=""></a>
    </header>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;

    &__logo>img { 
        display: block;
    }

    &__nav {
        flex-grow: 2;
        max-width: 1090px;
    }

    &__menu {
        display: flex;
        justify-content: start;
    }

    &__item {
        padding: 0 16px;
    }

    &__link {
        text-decoration: none;
        color: #fff;
        transition: 200ms;

        &_orange {
            color: #F38C2C;
        }

        &:hover {
            opacity: .6;
        }
    }

    &__settings {
        padding: 12px 20px;
        background-color: #47484B;
        border-radius: 12px;
        transition: 200ms;

        &:hover {
            background-color: lighten($color: #47484B, $amount: 6)
        }

        >img {
            display: block;
        }
    }
}
</style>