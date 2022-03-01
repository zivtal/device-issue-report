import { httpService } from "./http.service"

export const formService = {
  submit,
  createEmptyForm,
}

const API = 'form'

async function submit(form) {
  return await httpService.post(API, form);
}

function createEmptyForm() {
  return {
    userId: "",
    probDesc: "",
    deviceSN: "",
    indicators: [0, 0, 0],
  }
}