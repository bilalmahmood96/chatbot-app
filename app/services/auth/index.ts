import { GoogleAuth } from "google-auth-library";

function Auth(){
  const encodedKey  = process.env.NEXT_PUBLIC_GCP_CREDENTIALS ?? '';
  const auth = new GoogleAuth({
    credentials: JSON.parse(Buffer.from(encodedKey, 'base64').toString('utf-8')),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  return auth

}


export async function getAccessToken() {
  const client = Auth();
  try{
    const tokenResponse = await client.getAccessToken();
    return tokenResponse ?? '';
  }
  catch(error){
    console.log('error: ',error)
  }
  

  
}