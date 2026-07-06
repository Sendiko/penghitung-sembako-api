import { Request, Response } from "express";
import minioService from "../services/minio";

const UploadController = {
  async generatePresignedUploadUrl(req: Request, res: Response) {
    try {
      const { fileName, contentType, objectName } = req.body;

      if (!fileName && !objectName) {
        return res.status(400).json({
          status: 400,
          message: "fileName or objectName is required",
        });
      }

      const targetObjectName = objectName || fileName;
      const uploadUrl = await minioService.createPresignedUploadUrl(
        targetObjectName,
        contentType || "application/octet-stream"
      );

      return res.status(200).json({
        status: 200,
        message: "Presigned upload URL generated successfully",
        uploadUrl,
        objectName: targetObjectName,
        publicUrl: minioService.getPublicUrl(targetObjectName),
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

export default UploadController;
