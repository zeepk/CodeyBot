import express, { Request, Response } from "express";
import { Profile } from "../models/profile";
import { ApiResponse } from "../utils/customTypes";
import { isNullUndefinedOrWhitespace } from "../utils/helperFunctions";
import { maxUserNameLength, minUserNameLength } from "../utils/constants";
const router = express.Router();

router.post("/api/workflows/generate", async (req: Request, res: Response) => {
  const { authId } = req.body;
  const resp: ApiResponse = {
    success: true,
    message: "",
  };

  if (!authId) {
    const message = "AuthID not correctly provided";
    resp.message = message;
    console.error(message);
    return res.status(500).send(resp);
  }

  const profile = await Profile.findOne({ authId: authId });
  if (!profile) {
    // not logged in
    const message = "Profile not created yet";
    resp.message = message;
    console.error(message);
    return res.status(404).send(resp);
  }

  resp.data = profile;
  return res.status(200).send(resp);
});

router.post("/api/create-profile", async (req: Request, res: Response) => {
  const { authId, username } = req.body;
  const resp: ApiResponse = {
    success: true,
    message: "",
  };
  const validRequest =
    !isNullUndefinedOrWhitespace(authId) &&
    !isNullUndefinedOrWhitespace(username) &&
    username.length <= maxUserNameLength &&
    username.length >= minUserNameLength;

  if (!validRequest) {
    const message = "AuthID or username not correctly provided";
    resp.message = message;
    console.error(message);
    return res.status(400).send(resp);
  }

  const profile = await Profile.findOne({ username });
  if (profile) {
    const message = `User with name "${username}" already exists`;
    resp.message = message;
    console.error(message);
    return res.status(422).send(resp);
  }

  const createdProfile = await Profile.create({
    authId,
    username,
  });
  return res.status(201).send(createdProfile);
});

export { router as profileRouter };
