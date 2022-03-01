import { Request, Response } from "express";
import { formService } from "./form.service";

export async function query(req: Request, res: Response) {
  try {
    const send = await formService.query();
    res.json(send);
  } catch (err) {
    res.status(500).send({ err: "Failed to get reports" });
  }
}

export async function add(req: Request, res: Response) {
  try {
    res.json(await formService.add(req.body));
  } catch (err) {
    res.status(500).send({ err: "Failed to submit report" });
  }
}

export default {
  postForm: add,
  getReports: query,
};
