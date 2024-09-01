import db from "../lib/db"
import { DBResponse } from "../lib/types"
import logger from "../utils/logger"

export const create = async () => {

}

export const list = async () => {
  const response = await db.post('/query', { sql: 'SELECT * FROM user;' })
  if (!response) throw new Error("Failed to complete db query request")

  const { result, success, errors, messages } = response.data as DBResponse
  if (!success) {
    logger.error("Messages:::", messages, "\nErrors:::", errors)
    throw new Error("DB request failed")
  }

  // query
  const data = result && result.length > 0 ? result[0].results : undefined
  const queryStatus = result && result.length > 0 && result[0]?.success
  if (!queryStatus) throw new Error("DB query failed")


  logger.db('List users -', success && queryStatus ? "success" : "fail")
  return { data, success: success && queryStatus }
}
