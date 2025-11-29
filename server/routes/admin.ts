import { Request, Response } from "express";

export async function handleAdminAuth(_req: Request, res: Response) {
  try {
    const googleSheetUrl =
      "https://script.google.com/macros/s/AKfycbyyUb_zDNexKTFqsJNBhxKLWQS-rciXiphj0BRTnjOKBLtmRKdOHGAzcIrPM5KWpbJS/exec";

    const response = await fetch(googleSheetUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch authentication data",
        status: response.status,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
