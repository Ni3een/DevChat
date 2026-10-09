import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

class AuthController {
  static async login(request: Request, response: Response) {
    try {
      const body: LoginPayloadType = request.body;

      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      const JWTPayload = {
        name: findUser.name,
        email: findUser.email,
        id: findUser.id,
      };

      const secret = process.env.JWT_SECRET;

      if (!secret) {
        return response.status(500).json({
          message: "JWT_SECRET is not configured",
        });
      }

      const token = jwt.sign(JWTPayload, secret, {
        expiresIn: "365d",
      });

      return response.json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);

      return response.status(500).json({
        message: "Something went wrong. Please try again!",
      });
    }
  }
}

export default AuthController;