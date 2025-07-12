const htmlTemplate = `
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

const candidateHtml = `
 <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interview Invitation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .container {
      width: 600px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .content {
      padding: 30px 40px;
    }
    h2 {
      margin-top: 0;
      font-size: 24px;
      color: #2c3e50;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      padding: 20px 40px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table class="container" cellpadding="0" cellspacing="0">
          <tr>
            <td class="content">
              <h2>Interview Invitation</h2>
              <p>Dear <strong>{{candidate.name}}</strong>,</p>
              <p>
                You have been invited for an interview with
                <strong>{{organization.name}}</strong> for the
                <strong>{{round}}</strong> round.
              </p>
              <p style="margin-top: 20px;">
                <strong>Interview Date:</strong> {{interviewDate}}<br/>
                <strong>Meeting Link:</strong>
                <a href="{{meetingLink}}" target="_blank">Click to Join</a>
              </p>
              <p style="margin-top: 40px;">
                Best regards,<br/>
                <strong>Andgate HR Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td class="footer">
              &copy; {{currentYear}} Andgate Informatics Pvt. Ltd. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const interviewerHtml = `
 <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interview Assignment</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .container {
      width: 600px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .content {
      padding: 30px 40px;
    }
    h2 {
      margin-top: 0;
      font-size: 24px;
      color: #2c3e50;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      padding: 20px 40px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table class="container" cellpadding="0" cellspacing="0">
          <tr>
            <td class="content">
              <h2>Interview Assignment</h2>
              <p>Dear <strong>{{interviewer.name}}</strong>,</p>
              <p>
                You have been assigned to conduct an interview with
                <strong>{{candidate.name}}</strong> for the
                <strong>{{round}}</strong> round.
              </p>
              <p style="margin-top: 20px;">
                <strong>Interview Date:</strong> {{interviewDate}}<br/>
                <strong>Meeting Link:</strong>
                <a href="{{meetingLink}}" target="_blank">Click to Join</a>
              </p>
              <p style="margin-top: 40px;">
                Best regards,<br/>
                <strong>Andgate HR Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td class="footer">
              &copy; {{currentYear}} Andgate Informatics Pvt. Ltd. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = {
    htmlTemplate,
    candidateHtml,
    interviewerHtml
};