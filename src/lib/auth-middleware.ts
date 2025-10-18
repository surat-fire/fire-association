import { NextRequest } from 'next/server';
import { verifyToken, getTokenFromRequest } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    adminId: string;
    email: string;
    role: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return async (req: NextRequest): Promise<Response> => {
    const token = getTokenFromRequest(req);

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add admin info to request
    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.admin = {
      adminId: decoded.adminId,
      email: decoded.email,
      role: decoded.role,
    };

    return handler(authenticatedReq);
  };
}

export function requireRole(roles: string[]) {
  return function(handler: (req: AuthenticatedRequest) => Promise<Response>) {
    return withAuth(async (req: AuthenticatedRequest) => {
      if (!req.admin || !roles.includes(req.admin.role)) {
        return new Response(
          JSON.stringify({ error: 'Insufficient permissions' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return handler(req);
    });
  };
}
