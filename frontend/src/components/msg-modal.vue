<template>
  <div
    v-if="msg"
    class="msg-modal"
    @keydown.esc="onClick(null)"
    :style="backgroundStyle"
  >
    <div
      class="window"
      :class="{ center: !msg.event }"
      :style="windowStyle"
      @click.stop=""
    >
      <div class="title">
        <div class="text">{{ msg.title }}</div>
      </div>
      <div class="text">{{ msg.value }}</div>
      <div class="buttons">
        <button
          v-for="(className, button) in msg.controls"
          @click="onClick(button)"
          :key="button"
          :class="className"
        >
          {{ className }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sentenceToCamelCase,
  camelCaseToSentence,
} from "../service/util.service";

export default {
  name: "msg-modal",
  props: {
    msg: Object,
  },
  methods: {
    onClick(cmd) {
      if (cmd) this.$emit(sentenceToCamelCase(cmd), this.msg);
      this.$emit("close");
    },
    getTitle(title) {
      return camelCaseToSentence(title);
    },
  },
  computed: {
    backgroundStyle() {
      return this.msg.background
        ? { "background-color": "rgba(0, 0, 0, 0.5)" }
        : {};
    },
    windowStyle() {
      return this.msg.event
        ? { top: this.msg.event.y + "px", left: this.msg.event.x + "px" }
        : {};
    },
  },
};
</script>
