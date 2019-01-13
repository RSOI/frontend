<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.table, $style.wrapper__content]">
      <div :class="[$style.table__row]">
        <div :class="[$style.table__cell, $style.intro]">
          <p :class="[$style.intro__head]">
            Лучше чем stack<b>overflow</b>
          </p>
          <p>
            Присоединяйтесь к менее чем 2 пользователям.
            Иногда здесь задаются вопросы и, может быть, вам повезет найти здесь
            что-то актуальное!
          </p>
          <p>
            Задавайте вопросы и получайте на них ответы от
            лучших умов интернета!
          </p>
        </div>
        <div :class="[$style.table__col, $style.form]">
          <InputText
            :class="[$style.input]"
            placeholder="Логин"
            type="text"
            name="login"
          />
          <InputText
            :class="[$style.input]"
            placeholder="Пароль"
            type="password"
            name="password"
          />
          <div :class="[$style.table]">
            <div :class="[$style.table__row]">
              <Button primary :class="[$style.btn]">Войти</Button>
              <div :class="[$style.terms]">
                Обычно здесь пишут что-то про пользовательское соглашение,
                но у нас его нет. А эта надпись все равно добавляет солидности.
              </div>
            </div>
          </div>
          <div :class="[$style.signup]">
            Нет аккаунта?
            <router-link tag="a" to="/signup" :class="[$style.signup__link]">
              Зарегистрироваться!
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from './InputText'
import Button from './Button'

export default {
  components: {
    InputText,
    Button
  }
}
</script>

<style module lang="scss">
@import "../styles/const.scss";

.wrapper {
  padding: $padding-base;
  background: $color-bg-secondary;
  color: $color-text-contrast;

  &__content {
    max-width: $page-max-width;
    margin: auto;
  }
}

.table {
  display: table;

  &__row {
    display: table-row;
  }

  &__cell {
    display: table-cell;
    width: 50%;
  }
}

.intro {
  padding-top: 50px;
  padding-bottom: 100px;
  padding-right: $padding-base;

  &__head {
    @include fontSize7();
  }

  p {
    margin-top: $margin-base;
  }
}

.btn {
  display: cell;
  vertical-align: top;
}

.terms {
  color: $color-text-secondary;
  display: table-cell;
  width: 100%;
  padding-left: $padding-base / 2;
  @include fontSize2();
}

.form {
  max-width: 500px;
  margin: auto;
}

.signup {
  margin-top: $margin-base;
  color: $color-text-secondary;

  &__link {
    text-decoration-style: dashed;
    color: $color-text-contrast;

    &:hover {
      text-decoration: underline;
    }
  }
}

.input {
  margin-bottom: $margin-base;
}
</style>
