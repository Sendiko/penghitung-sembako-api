import User from "../models/user";
import Store from "../models/store";
import { Request, Response } from "express";

const UserController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{ model: Store }],
      });
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      return res.status(200).json({
        status: 200,
        user: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error,
      });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const isExisting = await User.findOne({
        where: { email: req.body.email },
        include: [{ model: Store }],
      });

      if (isExisting) {
        return res.status(200).json({
          status: 200,
          message: "User with this email already exists",
          user: isExisting,
        });
      }
      const user = await User.create(req.body);
      const userResponse = await User.findByPk(user.id, {
        include: [{ model: Store }],
      });
      return res.status(201).json({
        status: 201,
        message: "User created successfully",
        user: userResponse,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default UserController;
