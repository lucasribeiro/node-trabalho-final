import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction): void {
    
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Está faltando o token JWT', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        console.log(decoded);       

        return next();

    }
    catch {
        throw new AppError('Token JWT inválido.', 401);
    }
    

}