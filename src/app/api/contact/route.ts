import { transporter } from "@/lib/mailSender";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, company, subject, message } = body;

    // Basic validation
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Define the email
    const mailOptions = {
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message: ${subject}`,
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #490C0C; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Contact Message</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Full Name -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #490C0C; border-radius: 4px;">
                    <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Full Name</p>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 600;">\${fullName}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #490C0C; border-radius: 4px;">
                    <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #490C0C; font-weight: 600;">
                      <a href="mailto:\${email}" style="color: #490C0C; text-decoration: none;">\${email}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Phone and Company Row -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td width="48%" style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #490C0C; border-radius: 4px;" valign="top">
                    <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Phone</p>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 600;">\${phone || "N/A"}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #490C0C; border-radius: 4px;" valign="top">
                    <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Company</p>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 600;">\${company || "N/A"}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Subject -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #490C0C; border-radius: 4px;">
                    <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 600;">\${subject}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px; background-color: #f9f9f9; border-left: 4px solid #490C0C; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap;">\${message}</p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #490C0C; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; color: #ffffff; font-size: 14px;">This message was sent via your website contact form</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
