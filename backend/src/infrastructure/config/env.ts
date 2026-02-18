import dotenv from "dotenv"
import { InternalException } from "../../application/exceptions/internal.exception"

dotenv.config()

type RequiredEnvKey = "SOURCE_API_URL" | "TARGET_API_URL"

function requireEnv(key: RequiredEnvKey): string {
  const value = process.env[key]
  if (!value) {
    throw new InternalException(`${key} is not defined`)
  }
  return value
}

export const config = {
  PORT: Number(process.env.PORT) || 3000,
  SOURCE_API_URL: requireEnv("SOURCE_API_URL"),
  TARGET_API_URL: requireEnv("TARGET_API_URL")
}
