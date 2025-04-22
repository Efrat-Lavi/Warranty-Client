
import axios from "axios";
import { baseUrl } from "../App";



export const uploadFile = async ({ fileName, contentType }: { fileName: string, contentType: string }) => {
    try {
        const response = await axios.get(`${baseUrl}/api/upload/upload-url`, {
            params: {  fileName, contentType },
        });
        return response.data.url;
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};

export const downloadFile = async ({ fileName }: { fileName: string }) => {
    try {
        console.log(fileName);
        
        const response = await axios.get(`${baseUrl}/api/upload/download-url`,{
        params: {  fileName}
    });
    
        return response.data.downloadUrl;
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};

export const analyzeFile = async (downloadUrl: string) => {
    const response = await axios.post('https://keepit-service-ai.onrender.com/generate', {
    // const response = await axios.post('http://127.0.0.1:5000/generate', {
        file_url: downloadUrl,
    });
    
    return response;
}




export const downloadFileToComputer = async (presignedUrl:string,fileName:string) => {

    const fileResponse = await axios.get(presignedUrl, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
            const percent = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            console.log(`Download progress: ${percent}%`);
        },
    });

    // יצירת קישור זמני להורדה
    const blobUrl = window.URL.createObjectURL(new Blob([fileResponse.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName); // שימוש בשם המקורי
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
};