import { getAccessToken } from "../auth";
import axios from "axios";


export  async function handler() {
  const endpoint =   `https://europe-west3-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/${process.env.GCP_LOCATION}/publishers/google/models/gemini-1.5-flash-001:streamGenerateContent`
  const accessToken = await getAccessToken();

      const requestBody = { 
          "contents": [{
            "role": "user",
            "parts": [{
              "text": "What\'s a good name for a flower shop that specializes in selling bouquets of dried flowers?"
            }]
          }]
        }


      try {
          const rawResponse = await axios.post(endpoint, requestBody, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          const response = (JSON.stringify(rawResponse.data))
      
          console.log('response: ',response);
          return Response.json(response)
        } catch (error) {
          console.error('Error generating content:', error);
          throw error;
        }
}

// export class Chatbot{
//     modelAI
//     private auth: GcpAuth;
//     private endpoint =   ''//`https://europe-west3-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/${process.env.GCP_LOCATION}/publishers/google/models/gemini-1.5-flash-001:streamGenerateContent`
    
//     //`https://${process.env.GCP_LOCATION}-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/${process.env.GCP_LOCATION}/publishers/google/models/gemini-1.5-flash-001:generateContent` //`https://${process.env.GCP_LOCATION}-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/${process.env.GCP_LOCATION}/models/gemini-1.5-flash-001:predict`
//     constructor(){
//         this.modelAI = new GoogleGenerativeAI(process.env.API_KEY ?? '');
//         this.auth = new GcpAuth()
//     }

    

//     async generateResponse(prompt:string) {
//         const accessToken = await this.auth.getAccessToken();

//         const requestBody = { 
//             "contents": [{
//               "role": "user",
//               "parts": [{
//                 "text": "What\'s a good name for a flower shop that specializes in selling bouquets of dried flowers?"
//               }]
//             }]
//           }


//         try {
//             const response = await axios.post(this.endpoint, requestBody, {
//               headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//               },
//             });
        
//             console.log(JSON.stringify(response.data));
//           } catch (error) {
//             console.error('Error generating content:', error);
//             throw error;
//           }


//     //     const vertexAI = new VertexAI({
//     //         project: 'velvety-network-429322-u4', 
//     //         location: 'europe-central2',
//     //     });


//     //         const generativeModel = vertexAI.getGenerativeModel({
//     //             model: 'gemini-1.5-flash-001',
//     //         });

        
//     //       const resp = await generativeModel.generateContent(prompt);
//     //       const contentResponse = await resp.response;
//     //       console.log(JSON.stringify(contentResponse));
//       }
// }