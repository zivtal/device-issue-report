<template>
  <div>
    <form class="report-form">
      <section class="user-id">
        <label for="userId"
          ><span>User ID:</span
          ><input ref="uId" v-model="report.userId" type="number" required
        /></label>
        <p v-if="clickCount && !isValidUserId">Enter user Id</p>
      </section>
      <section class="problem-desc">
        <label for="probDesc"
          ><span>Problem description:</span
          ><textarea v-model="report.probDesc" maxlength="300" />
        </label>
      </section>
      <section class="device-serial">
        <label for="deviceSN"
          ><span>Device serial number:</span
          ><input type="text" v-model="report.deviceSN" required maxlength="64"
        /></label>
        <p v-if="clickCount && !isValidDeviceSN">
          Enter valid serial number, example: 24-X-125447-DC
        </p>
      </section>
      <section>
        <label
          ><span>Status indicator lights:</span>
          <section class="indicators">
            <div
              v-for="(indicator, idx) in report.indicators"
              :key="'indicator' + idx"
              class="indicator"
              :class="indicatorClass(idx)"
              @click="indicatorSwitch(idx)"
            >
              {{ idx + 1 }}
            </div>
          </section>
        </label>
      </section>
    </form>
    <button @click.stop="sendForm" class="submit-btn">Submit</button>
    <MsgModal :msg="res" @close="res = null" />
  </div>
</template>

<script>
import { httpService } from "../service/http.service";
import { formService } from "../service/form.service";
import MsgModal from "./msg-modal.vue";

export default {
  name: "form-report",
  components: {
    MsgModal,
  },
  data() {
    return {
      report: formService.createEmptyForm(),
      res: null,
      clickCount: 0,
    };
  },
  methods: {
    async sendForm() {
      if (this.validate()) {
        const res = await httpService.post("form", this.report);
        this.res = {
          title: "Server response",
          value: res,
          controls: ["ok"],
          background: true,
        };
        this.report = formService.createEmptyForm();
        this.clickCount = 0;
      } else {
        this.clickCount++;
        return;
      }
    },
    indicatorClass(idx) {
      const indicator = this.report.indicators[idx];
      switch (indicator) {
        case 1:
          return { off: true };
        case 2:
          return { blink: true };
        default:
          return { on: true };
      }
    },
    indicatorSwitch(idx) {
      const indicator = this.report.indicators[idx];
      this.report.indicators.splice(
        idx,
        1,
        indicator === 2 ? 0 : indicator + 1
      );
    },
    validate() {
      return this.isValidUserId && this.isValidDeviceSN;
    },
  },
  computed: {
    isValidUserId() {
      return Boolean(this.report.userId);
    },
    isValidDeviceSN() {
      return Boolean(
        // IF THE EX MEANS FIXED 64 CHARS THE REGEX SHOULD BE: /^([0-9]{2})+([A-Za-z0-9-]){62}$/g
        this.report.deviceSN.match(/^([0-9]{2})+([A-Za-z0-9-]){0,62}$/g)
      );
    },
  },
  watch: {
    // report: {
    //   handler(data, prev) {
    //     console.log(data, prev);
    //   },
    //   deep: true,
    // },
  },
};
</script>

<style scoped></style>
