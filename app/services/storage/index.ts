import { Storage } from "@google-cloud/storage";

export function  GCPStorage(){
    const gcpStorage = new Storage({
        projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
        scopes: 'https://www.googleapis.com/auth/cloud-platform',
        credentials: {
          private_key: process.env.NEXT_PUBLIC_GCP_PRIVATE_KEY
            ?.split(String.raw`\n`)
            ?.join('\n'),
          client_email: process.env.NEXT_PUBLIC_GCP_CLIENT_EMAIL,
        },
      });

      return gcpStorage

}

export function updateFileName(fileName: string){
    return fileName.replaceAll(' ','-').toLowerCase()
}

export function getFileUri(fileName: string){
   return `gs://synsugar-chatbot-storage/${updateFileName(fileName)}`
}