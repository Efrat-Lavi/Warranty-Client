import axios from "axios";
import { baseUrl } from "../App";

export const sendEmail = async (to: string, subject: string, inviter: string, permission: string, warrantyLink: string) => {
    const emailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2c3e50;">You've Been Invited!</h2>
            <p><strong>${inviter}</strong> has invited you to access a warranty.</p>
            <p>You have been granted <strong>${permission}</strong> access.</p>
            <div style="margin-top: 20px;">
                <a href="${warrantyLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    View Warranty
                </a>
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">If you didn't expect this invitation, you can ignore this email.</p>
            <div style="font-size: 12px; color: #888;">© 2025 Warranty Keeper | All rights reserved.</div>
        </div>
    </div>`;

    try {
        const response = await axios.post(`${baseUrl}/api/email/send`, {
            to,
            subject,
            body: emailHtml,
            isHtml: true,
        });

        if (response.status === 200) {
            console.log("Email sent successfully.");
            return true;
        } else {
            console.error("Failed to send email.");
            return false;
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

export const sendEmailOnRegistration = async ({email,warrantyLink}:{email: string,warrantyLink:string}) => {
    
    const subject = "Welcome to Keep It!";
    const logoUrl = "https://files-warranty.s3.eu-north-1.amazonaws.com/warranty-vault-logo+(3).png";  // הקישור לתמונה שלך

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <img src="${logoUrl}" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50;">Welcome to Keep It!</h2>
            <div style="margin-top: 20px;">
                <a href="${warrantyLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #10a37f; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    I Want to start!
                </a>
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">If you didn't expect this invitation, you can ignore this email.</p>
            <div style="font-size: 12px; color: #888;">© 2025 Warranty Keeper | All rights reserved.</div>
        </div>
    </div>`;

    try {
        const response = await axios.post(`${baseUrl}/api/email/send`, {
            to: email,
            subject,
            body: emailHtml,
            isHtml: true,
        });

        if (response.status === 200) {
            console.log("Welcome email sent successfully.");
            return true;
        } else {
            console.error("Failed to send welcome email.");
            return false;
        }
    } catch (error) {
        console.error("Error sending welcome email:", error);
        return false;
    }
};
