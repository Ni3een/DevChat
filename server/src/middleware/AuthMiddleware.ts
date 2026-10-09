import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader == null || authHeader === undefined) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ status: 500, message: "JWT_SECRET is not configured" });
    }

    // Verify token
    jwt.verify(token, secret, (err: any, user: any) => {
        if (err) return res.status(401).json({ status: 401, message: "Unauthorized" });
        req.user = user as AuthUser;
        next();
    });
};

export default authMiddleware;