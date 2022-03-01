import { mySql } from "../../service/mysql.service";
import ConditionsMap, { UserForm } from "./form.model";
import logger from "../../middleware/logger.middleware";

const reportsDb = "reports";
const devicesDb = "devices";

async function query() {
  try {
    const devicesRes: any = await mySql(`SELECT * FROM ${devicesDb}`);
    const reports = await mySql(`SELECT * FROM ${reportsDb}`);
    const devices = devicesRes.map((device: any) => ({
      model: device.model,
      conditions: JSON.parse(device.conditions),
      response: JSON.parse(device.response),
    }));
    return { reports, devices };
  } catch (err) {
    throw err;
  }
}

async function add(form: UserForm) {
  try {
    const response = await _checkReport(form.deviceSN, form.indicators);
    await mySql(`INSERT INTO ${reportsDb} (createdAt, userId, probDesc, deviceSN, indicators, response) 
    VALUES ("${Date.now()}",
            "${form.userId}",
            "${form.probDesc}",
            "${form.deviceSN}",
            "${form.indicators}",
            "${response || "Unknown problem"}")`);
    logger.info(
      "User ID: " + form.userId,
      "Serial: " + form.deviceSN,
      "Indicators: " + form.indicators,
      "Response: " + response
    );
    return response;
  } catch (err) {
    throw err;
  }
}

export const formService = {
  add,
  query,
};

async function _checkReport(
  serial: string,
  indicators: Array<number>
): Promise<string> {
  if (!isNaN(Number(serial))) return "Bad serial number";
  const model = serial.slice(0, 4);
  const devices: any = await mySql(
    `SELECT * FROM ${devicesDb} WHERE ${devicesDb}.model="${model}"`
  );
  if (!devices.length) return "Unknown device";
  const { conditions, response } = devices[0];
  const query = new ConditionsMap(JSON.parse(conditions), JSON.parse(response));
  return query.check(_indicatorsMap(indicators)) || "Unknown problem";
}

function _indicatorsMap(indicators: Array<number>) {
  return indicators.reduce(
    (sum: any, item: number) => {
      switch (item) {
        case 0:
          return { ...sum, on: sum.on + 1 };
        case 1:
          return { ...sum, off: sum.off + 1 };
        case 2:
          return { ...sum, blink: sum.blink + 1 };
      }
    },
    { on: 0, off: 0, blink: 0 }
  );
}

//! Only for testing
// _test();
// async function _test(serial = "51-B", indicators = [0, 0, 1]) {
//   console.log(
//     serial,
//     indicators,
//     "Result: " + (await _checkReport(serial, [0, 0, 1]))
//   );
// }
