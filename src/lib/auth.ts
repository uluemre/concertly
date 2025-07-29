// src/lib/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

export function getCurrentUserFromToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (error) {
        console.error('Token çözümleme hatası:', error);
        return null;
    }
}
