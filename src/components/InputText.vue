<template>
  <label :class="[$style.wrapper]"  @click="$emit('click')">
    <div
      v-if="maxLength"
      :class="[
        $style.inputLimit, {
          [$style.inputLimitNegative]: currentLimit < 0 || error
        }
      ]"
    >
      {{ currentLimit }}
    </div>
    <div v-if="title" :class="[$style.title]">
      {{ title }}
      <span
        v-if="required"
        :class="[$style.required]"
      >*</span>
    </div>
    <div :class="[
      $style.input__wrapper,
      disabled ? $style.input__wrapperDisabled: $style.input__wrapperDefault,
    ]">
      <div :class="[$style.input]">
        <div
          v-if="!!$slots.pre_input"
          :class="[
            $style.inputEl__additional,
            $style.inputEl__additional_pre,
            {
              [$style.inputEl__additional_error]: error,
              [$style.inputEl__additional_focused]: focused
            }
          ]"
        >
          <slot name="pre_input" />
        </div>
        <div :class="[$style.inputEl__wrapper]">
          <template v-if="type === 'textarea'">
            <textarea
              :rows="rows || 2"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              :value="value"
              :autocomplete="autocomplete"
              @focus="onFocus"
              @input="onInput"
              @change="onChange"
              @blur="onBlur"
              :class="[
                $style.inputEl,
                disabled ? $style.inputElDisabled: $style.inputElDefault,
                $style.inputEl__textarea,
                {
                  [$style.inputElError]: error,
                  [$style.inputElStrictBottom]: toBeContinued,
                  [$style.inputEl_focused]: focused
                }
              ]"
            />
            <slot name="ta-controls"></slot>
          </template>
          <input
            v-else
            ref="input"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :value="value"
            :autocomplete="autocomplete"
            @focus="onFocus"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"
            :class="[
              $style.inputEl,
              {
                [$style.inputElError]: error,
                [$style.inputEl_focused]: focused,
                [$style.inputElContinue]: !!$slots.pre_input > 0,
                [$style.inputElEndless]: toBeContinued || !!$slots.post_input > 0
              }
            ]"
          />
        </div>
        <div
          v-if="!!$slots.post_input"
          :class="[
            $style.inputEl__additional,
            $style.inputEl__additional_post,
            {
              [$style.inputEl__additional_error]: error,
              [$style.inputEl__additional_focused]: focused
            }
          ]"
        >
          <slot name="post_input" />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="error" :class="[$style.error]">
        {{ error }}
      </div>
    </transition>
    <div
      v-if="$slots.description"
      :class="[$style.description]"
    >
      <slot name="description" />
    </div>
  </label>
</template>

<script>
export default {
  inject: ['$validator'],
  $_veeValidate: {
    name () {
      return this.name
    },
    value () {
      return this.value
    }
  },
  data () {
    return {
      focused: false
    }
  },
  props: {
    title: String,
    value: String,
    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    rows: Number, // height for textarea
    maxLength: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'text',
      validator: val => {
        return (
          ['url', 'text', 'password', 'email', 'search', 'textarea'].indexOf(val) !== -1
        )
      }
    },
    name: {
      type: String,
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    validate: String,
    error: String,
    toBeContinued: Boolean,
    updateOnChange: Boolean
  },
  computed: {
    currentLimit () {
      let limit = 0
      if (this.maxLength) {
        limit = this.maxLength - (this.value || '').length
      }
      return limit
    }
  },
  methods: {
    onBlur (e) {
      this.$emit('blur')
      this.focused = false
    },
    onFocus (e) {
      this.$emit('focus', e.target.value)
      this.focused = true
    },
    onInput (e) {
      this.$emit('input', e.target.value)
    },
    onChange (e) {
      this.$emit('change', e.target.value)
    },
    focus () {
      const input = this.$refs.input
      if (input) {
        input.focus()
      }
    }
  },
  mounted () {
    this.$validator.extend('udashdigiten', {
      validate: (text) => {
        const validateInput = (text) => {
          return Promise.resolve({
            valid: text.match(/^[a-zA-Z][a-zA-Z\d_]{2,}$/)
          })
        }
        return Promise.resolve(validateInput(text))
      }
    })
  }
}
</script>

<style scoped module lang="scss">
@import "../styles/const.scss";

@mixin focused () {
  outline: none;
  border-color: $color-border-active;
}

.wrapper {
  display: block;
  padding: 0;
}

.title {
  @include fontSize4();
  font-weight: bold;
  margin-bottom: $margin-form-title;
}

.description {
  @include fontSize2();
  color: $color-text-secondary;
}

.error {
  @include fontSize3();
  color: $color-error;
  margin-top: $margin-error;
}

.required {
  color: $color-error;
}

.inputLimit {
  @include fontSize2();
  float: right;
  transition: color 0.5s;

  &Negative {
    color: $color-error;
  }
}

.input {
  display: table-row;

  &__wrapper {
    display: table;
    width: 100%;
    border-spacing: 0px;
    border-radius: $size-border-radius;
    &Disabled {
      background: $color-bg-secondary-disabled;
    }
    &Default {
      background: $color-bg;
    }
  }

  &:hover {
    .inputEl {
      border-color: $color-border-hover;

      &__additional {
        border-color: $color-border-hover;
      }

      &__additional_focused {
        @include focused();
      }

      &_focused {
        @include focused();
      }
    }
  }
}

.inputEl {
  appearance: none;
  outline: none;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid $color-border;
  border-radius: $size-border-radius;
  vertical-align: top;
  transition: border-color 0.5s;
  width: 100%;
  @include fontSize4();
  padding: $input-padding;

  &Continue {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &Endless {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }

  &StrictBottom {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:focus {
    outline: none;
    border-color: $color-border-active;

    &__additional {
      border-color: $color-border-active;
    }
  }

  &Error {
    border-color: $color-error !important;
  }

  &Disabled {
    background: rgba(0,0,0,0);
  }

  &:disabled {
    background: rgba(0,0,0,0);
    opacity: 1;
  }

  &Default {
    background: $color-bg;
  }

  &__wrapper {
    display: table-cell;
    width: 100%;
  }

  &__additional {
    position: relative;
    display: table-cell;
    border: 1px solid $color-border;
    color: $color-text;
    vertical-align: top;
    transition: border-color 0.5s;
    @include fontSize4();
    padding: $input-padding;
    padding-right: 0;

    &_focused {
      @include focused();
    }

    &_error {
      border: 1px solid $color-error;
      border-right: 0;
    }

    &_pre {
      border-right: 0;
      border-top-left-radius: $size-border-radius;
      border-bottom-left-radius: $size-border-radius;

      &.inputEl__additional {
        padding-right: 0;
        &_error {
          border-right: 0;
        }
      }
    }

    &_post {
      border-left: 0;
      border-top-right-radius: $size-border-radius;
      border-bottom-right-radius: $size-border-radius;

      &.inputEl__additional {
        padding-left: 0;
        &_error {
          border-left: 0;
        }
      }
    }
  }

  &__textarea {
    resize: vertical;
  }
}

.pseudoInput__content {
  min-height: 20px;
}
</style>
