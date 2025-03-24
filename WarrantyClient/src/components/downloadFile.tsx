import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";

const FileDownload = () => {
    const [fileName, setFileName] = useState<string>("");
    const [progress, setProgress] = useState(0);
    const userId = useSelector((store:StoreType)=>store.auth.user?.id);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value); // שמירת שם הקובץ מתוך הקלט
        console.log(fileName);
        
    };
    const handleDownload = async () => {
        console.log(fileName);
        
        if (!fileName.trim()) return;
    
        try {
            console.log(`Requesting download URL for file: ${fileName}`);
    
            // שלב 1: בקשת URL חתום מהשרת
            const response = await axios.get(`https://localhost:7200/api/upload/download-url/${fileName}`, {
                params: { userId},
            });
            console.log(response);
            
            const presignedUrl = response.data.downloadUrl; // כאן השרת מחזיר string ולא אובייקט
            console.log(`Presigned URL received: ${presignedUrl}`);
    
            // שלב 2: הורדת הקובץ מה-S3
            const fileResponse = await axios.get(presignedUrl, {
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percent);
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
    
            alert("הקובץ הורד בהצלחה!");
        } catch (error) {
            console.error("שגיאה בהורדת הקובץ:", error);
            alert("התרחשה שגיאה במהלך ההורדה.");
        }
    };
    

    return (
        <div>
            <input
                type="text"
                placeholder="הזן שם קובץ"
                value={fileName}
                onChange={handleFileChange}
            />
            <button onClick={handleDownload}>הורד קובץ</button>
            {progress > 0 && <div>התקדמות: {progress}%</div>}
        </div>
    );
};

export default FileDownload;
