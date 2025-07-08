// src/lib/session.ts
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export type SessionPayload = {
  userId: string
  role: string
  expiresAt: Date
}

// استرجاع المفتاح بشكل آمن
function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error('SESSION_SECRET is not defined in environment variables')
  }
  return new TextEncoder().encode(secret)
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  const encodedKey = getSecretKey()
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(token: string | undefined = ''): Promise<SessionPayload | null> {
  try {
    const encodedKey = getSecretKey()
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as SessionPayload
  } catch (error) {
    console.error('❌ Failed to verify session:', error)
    return null
  }
}

export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 أيام
  const token = await encrypt({ userId, role, expiresAt })

  ;(await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const cookieStore = cookies()
  const session = (await cookieStore).get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) return null

  await createSession(payload.userId, payload.role) // يعيد إنشاء الكوكي مع وقت جديد
  return true
}

export async function deleteSession() {
  (await cookies()).delete('session')
}
