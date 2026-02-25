import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check for existing subscription
        const existing = await prisma.waitlist.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (existing) {
            const count = await prisma.waitlist.count();
            return NextResponse.json({
                success: true,
                already_subscribed: true,
                position: count,
            });
        }

        // Insert new subscription
        await prisma.waitlist.create({
            data: {
                email: email.toLowerCase().trim(),
                source: "landing_page",
            },
        });

        const count = await prisma.waitlist.count();

        return NextResponse.json({
            success: true,
            position: count,
        });
    } catch (error) {
        console.error("Subscribe error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
