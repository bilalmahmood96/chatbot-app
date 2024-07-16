import { getAccessToken } from "@/app/services/auth"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest ) {
  const rawRequest = await request.json()
  try{
    const endpoint =   `https://europe-west3-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/${process.env.GCP_LOCATION}/publishers/google/models/gemini-1.5-flash-001:generateContent`
    const accessToken = await getAccessToken();
    const requestBody = { 
        "contents": rawRequest.data
      }
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        },
      });
      return NextResponse.json(response.data);
  }
  catch(error){
    console.log('error: ',error)
    throw error
  }
  
}