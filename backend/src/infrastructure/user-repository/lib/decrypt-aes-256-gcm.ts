import crypto from "crypto"

export function decryptAes256Gcm<T>(params: {
  iv: string
  authTag: string
  encrypted: string
  secretKey: string
  algorithm: "aes-256-gcm" | string
}): T {
  const { iv, authTag, encrypted, secretKey, algorithm } = params

  const key = Buffer.from(secretKey, "hex")
  const ivBuffer = Buffer.from(iv, "hex")
  const authTagBuffer = Buffer.from(authTag, "hex")
  const encryptedBuffer = Buffer.from(encrypted, "hex")

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    ivBuffer
  ) as crypto.DecipherGCM
  decipher.setAuthTag(authTagBuffer)

  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final()
  ]).toString("utf8")

  return JSON.parse(decrypted) as T
}
