import { GCPStorage, updateFileName } from "@/app/services/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest ) {
    const data = await request.formData()
    const file = data.get("file") as File;
    try{
        const gcpStorage = GCPStorage()
        const bucket = gcpStorage.bucket(`${process.env.NEXT_PUBLIC_GCP_BUCKET}`);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await new Promise((resolve, reject) => {
        const blob = bucket.file(updateFileName(file.name));
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream
            .on("error", (error: any) => reject(error))
            .on("finish", () => resolve(true));

        blobStream.end(buffer);
        });

        return NextResponse.json(response);


    }catch(error){

    }
}