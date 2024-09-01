import db from "../lib/db";
import { DBResponse, User } from "../lib/types";
import logger from "../utils/logger";

export const create = async (user: User) => {
  const response = await db.post("/query", {
    params: [
      user.id,
      user.uid,
      user.username,
      user.email,
      user.password_hash,
      user.verified,
    ],
    sql: "INSERT INTO user (id, uid, username, email, password_hash, verified) VALUES (?, ?, ?, ?, ?, ?);",
  });

  const { result, success, errors, messages } = response.data as DBResponse;
  if (!success) {
    logger.error("Messages:::", messages, "\nErrors:::", errors);
    throw new Error("DB request failed");
  }
  if (!response) throw new Error("Failed to complete db query request");

  logger.debug(result);
};

export const isEmailInUse = async (email: string) => {
  const response = await db.post("/query", {
    params: [email],
    sql: "SELECT * FROM user WHERE email = ?;",
  });

  const { result, success, errors, messages } = response.data as DBResponse;
  if (!success) {
    logger.error("Messages:::", messages, "\nErrors:::", errors);
    throw new Error("DB request failed");
  }
  if (!response) throw new Error("Failed to complete db query request");

  // query
  const data = result && result.length > 0 ? result[0].results : [];
  const queryStatus = result && result.length > 0 && result[0]?.success;
  if (!queryStatus) throw new Error("DB query failed");

  logger.db(
    "Check whether email is in use -",
    success && queryStatus ? "success" : "fail",
  );
  return { exists: data && data?.length > 0, success: success && queryStatus };
};

export const list = async () => {
  const response = await db.post("/query", { sql: "SELECT * FROM user;" });

  const { result, success, errors, messages } = response.data as DBResponse;
  if (!success) {
    logger.error("Messages:::", messages, "\nErrors:::", errors);
    throw new Error("DB request failed");
  }
  if (!response) throw new Error("Failed to complete db query request");

  // query
  const data = result && result.length > 0 ? result[0].results : undefined;
  const queryStatus = result && result.length > 0 && result[0]?.success;
  if (!queryStatus) throw new Error("DB query failed");

  logger.db("List users -", success && queryStatus ? "success" : "fail");
  return { data, success: success && queryStatus };
};
