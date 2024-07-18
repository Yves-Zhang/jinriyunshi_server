import jwt from 'jsonwebtoken'

// 解密函数
export function decrypt(encryptedToken) {
  const key = process.env.CRYPTKEY // 密钥，需要保密
  const decoded = jwt.verify(encryptedToken, key)
  return decoded
}
