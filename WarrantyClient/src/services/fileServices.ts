
import axios from "axios";



export const uploadFile = async ({ fileName, contentType }: { fileName: string, contentType: string }) => {
    try {
        const response = await axios.get('https://localhost:7200/api/upload/upload-url', {
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
        
        const response = await axios.get(`https://localhost:7200/api/upload/download-url`,{
        params: {  fileName}
    });
    console.log(response);
    
        return response.data.downloadUrl;
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};

export const analyzeFile = async (downloadUrl: string) => {
    const response = await axios.post('http://127.0.0.1:5000/generate', {
        file_url: downloadUrl,
    });
    console.log(response);

    return response.data;
}
export const extractWarrantyDetails = (responseText: string) => {
    try {
        // ביטוי רגולרי למציאת ה-JSON בתוך הטקסט
        const match = responseText.match(/\{[\s\S]*\}/);
        if (!match) {
            console.error("No valid JSON found in response:", responseText);
            return null;
        }

        // המרת ה-JSON למבנה אובייקט
        const jsonText = match[0];
        const parsedData = JSON.parse(jsonText);

        // שליפת הנתונים הדרושים
        return {
            product_name: parsedData.product_name || null,
            company_name: parsedData.company_name || null,
            expiration_date: parsedData.expiration_date || null
        };
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
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