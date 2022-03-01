import { ObjectId } from "mongodb";

export interface UserForm {
  userId: string;
  probDesc: string;
  deviceSN: string;
  indicators: Array<number>;
}

export interface Report extends UserForm {
  id: string;
  createdAt: number;
  response: string;
}

export interface Device {
  _id?: ObjectId;
  model?: string;
  conditions: Array<Conditions>;
  response: Array<string>;
}

export interface Conditions {
  eqOff?: number;
  eqOn?: number;
  eqBlink?: number;
  ltOff?: number;
  ltOn?: number;
  ltBlink?: number;
  gtOff?: number;
  gtOn?: number;
  gtBlink?: number;
}

export interface IndicatorsMap {
  on: number;
  off: number;
  blink: number;
}

export default class ConditionsMap {
  constructor(
    public conditions: Array<Conditions>,
    public response: Array<any>
  ) {}
  public check(indicators: any) {
    const result = this.conditions.map((condition: any) => {
      for (const condKey in condition) {
        const key = this._key(condKey);
        const prefix = condKey.slice(0, 2);
        switch (prefix) {
          case "ne": // not equal
            if (indicators[key] === condition[condKey]) return false;
            break;
          case "eq": // equal
            if (indicators[key] !== condition[condKey]) return false;
            break;
          case "gt": // equal or great then
            if (indicators[key] < condition[condKey]) return false;
            break;
          case "lt": // equal or lower then
            if (indicators[key] > condition[condKey]) return false;
            break;
        }
      }
      return true;
    });
    const idx = !result.length ? 0 : result.findIndex((res: boolean) => res);
    return this.response[idx] || undefined;
  }
  private _key(condKey: string) {
    let key = condKey.slice(2);
    return key.charAt(0).toLowerCase() + key.slice(1);
  }
}
