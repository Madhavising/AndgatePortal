export const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Application Accepted</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 700px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            .header {
                text-align: center;
                margin-bottom: 20px;
            }

            .header h2 {
                color: #333;
            }

            .content {
                color: #444;
                font-size: 16px;
                line-height: 1.6;
            }

            .footer {
                margin-top: 30px;
                font-size: 13px;
                color: #999;
                text-align: center;
            }

            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff !important;
                text-decoration: none;
                border-radius: 5px;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="header">
                <h2>Application Accepted - Andgate Informatics Pvt. Ltd.</h2>
            </div>

            <div class="content">
                <p>Dear {{candidateName}},</p>

                <p>
                We are pleased to inform you that your application for a position at
                <strong>Andgate Informatics Pvt. Ltd.</strong> has been successfully accepted.
                </p>

                <p>
                Our recruitment team was impressed with your qualifications and experience.
                We look forward to moving ahead with the next steps in the selection process.
                </p>

                <p>
                You will be contacted shortly with further instructions regarding the interview
                schedule and any additional requirements.
                </p>

                <p>
                If you have any questions, feel free to reply to this email or contact our HR
                department at <a href="mailto:hr@andgate.com">hr@andgate.com</a>.
                </p>

                <p>We appreciate your interest in joining our team!</p>

                <p>Best regards,<br /><strong>Andgate HR Team</strong></p>
            </div>

            <div class="footer">
                &copy; 2025 Andgate Informatics Pvt. Ltd. All rights reserved.
            </div>
            </div>
        </body>
        </html>
`;