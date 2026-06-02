import { NextResponse } from "next/server";
import { connectDB } from "@/db/connectDB";
import Resume from "@/models/resume.model";
import { requireSession } from "@/lib/auth-guard";

export async function POST(req) {
  try {
    const auth = await requireSession();
    if (auth.error) return auth.error;
    const { session } = auth;

    // Connect to MongoDB
    await connectDB();

    // Get data from frontend
    const body = await req.json();
    body.userEmail = session.user.email; // Force email from session for security

    // Save resume in database
    const resume = await Resume.create(body);

    return NextResponse.json({
      success: true,
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const auth = await requireSession();
    if (auth.error) return auth.error;
    const { session } = auth;

    await connectDB();

    // Fetch the most recently updated resume for this user
    const resume = await Resume.findOne({ userEmail: session.user.email }).sort({ updatedAt: -1 });

    if (!resume) {
      return NextResponse.json(
        { success: false, message: "No resume found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Resume fetched successfully", resume },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}