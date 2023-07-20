// https://imgbb.com/
const PdfCode = (
  name,
  department,
  academicSession,
  rollNo,
  regNo,
  bloodGroup,
  address,
  district,
  pinCode,
  studentContactNo,
  guardianNo,
  studentPhoto,
) => {
 

  const qrCodeData = `Jalpaiguri Govt. Engg. College -- Jalpaiguri-735131 Dept.: ${department} Course: B.Tech. Academic Session: ${academicSession} Name : ${name} Roll No. : ${rollNo} Registration No. : ${regNo} Blood Group  : ${bloodGroup} Present Address  : ${address}, Dist : ${district}, Pin : ${pinCode} Permanent Address : ${address}, Dist : ${district}, Pin : ${pinCode} Student's Mob No.: ${studentContactNo} Guardian's Mob No.: ${guardianNo}`;
  
  return  `
<!DOCTYPE html>
<html>
<head>
  <title>Identity Card</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: Calibri, Arial, sans-serif;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }

    .container {
      position: relative;
      max-width: 10in;
      min-height: 10in;
      margin: 0 auto;
      background-image: url("https://i.ibb.co/6YGPMWV/container-BG.jpg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border: 3px solid black;
      padding: 1.2in;
    }

    .logo {
      position: absolute;
      top: 0.15in;
      left: 0.5in;
      width: 1.50in;
      height: 1.50in;
    }

    .college-name {
      font-weight: bold;
      position: absolute;
      top: 0.40in;
      left: 2.40in;
      width: 6.5in;
      line-height: 0.45in;
      /* font-weight: normal; */
      font-size: 33pt;
      color: #ffffff;
      
    }

    .college-address {
      font-weight: bold;
      position: absolute;
      top:1in;
      left: 2.4in;
      width: 5.5in;
      line-height: 0.30in;
      /* font-weight: normal; */
      font-size: 20pt;
      color: #ffffff;
      
    }

    .student-photo {
      width: 3in;
      height: 3in;
      display: block;
      margin: 0 auto;
      margin-top: 0.50in;
      border: 3px solid gray;
      border-radius: 50%; 
    }

    .student-name {
      font-weight: bold;
      font-size: 28pt;
      color: #000000;
      text-align: center;
      margin-top: 0.2in;
    }

    .dept-course {
      font-weight: bold;
      font-size: 18pt;
      color: #000000;
      text-align: center;
      margin-top: 0.1in;
    }

    .id-card-heading {
      font-weight: bold;
      font-size: 22pt;
      color: #000000;
      text-align: center;
      margin-top: 0.2in;
      margin-bottom: 0.3in;
      text-decoration: underline;
    }

    .details{
      margin-left: 8%;
    }

    .details-label {
      font-weight: bold;
      font-size: 20pt;
      color: #000000;
      display: inline-block;
      width: 2.5in;
    }

    .details-value {
      font-weight: bold;
      font-size: 20pt;
      color: #000000;
      display: inline-block;
      margin-left: 0.2in;
    }

    .address-value{
     font-size: 12pt;
     font-weight: bold;
     margin-left: 0.2in;
    }

    .principal-signature {
      width: 2in;
      height: 0.87in;
      margin-top: 0.5in;
    }

    .qr-code {
      width: 1in;
      height: 1in;
      margin-top: 0.5in;
    }

    #address2{
      display: block;
      position: relative;
      left: 18.4rem;
    }

    .signature-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: -0.3in;
      
    }


    @media only screen and (max-width: 600px) {
      .container {
        max-width: 100%;
        height: auto;
        border-radius: 0;
        padding: 0.5in;
      }

      .logo, .student-photo, .principal-signature, .qr-code {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      .college-name {
        text-align: center;
        margin-top: 0.1in;
      }

      .college-address {
        text-align: center;
        margin-top: 0.1in;
      }

      .student-name {
        text-align: center;
        /* margin-top: 0.0in; */
      }

      .dept-course {
        text-align: center;
        margin-top: 0.1in;
      }

      .id-card-heading {
        margin-top: 0.3in;
      }

      .id-card-line {
        margin-top: 0.2in;
      }

      .details-label, .details-value, .address-value {
        text-align: center;
        margin-top: 0.2in;
        display: block;
        width: 100%;
      }

      .principal-signature {
        margin-top: 0.3in;
      }

      .qr-code {
        margin-top: 0.3in;
      }

      .signature-container {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <img class="logo" src="https://i.ibb.co/8mtC5nF/JGECLogo.png" alt="College Logo">
    <div class="college-name">Jalpaiguri Govt. Engg. College</div>
    <div class="college-address">Jalpaiguri- 735102, Phone: 03561-255131</div>
    <img class="student-photo" src="${studentPhoto}" alt="Student Photo">
    <div class="student-name">${name}</div>
    <div class="dept-course">Dept.: ${department} Course: B.Tech</div>
    <div class="id-card-heading">STUDENT IDENTITY CARD</div>
    <div class="details">
      <div>
        <span class="details-label">Academic Session</span>
        <span class="details-value">:</span>
        <span class="details-value">${academicSession}</span>
      </div>
      <div>
        <span class="details-label">Roll Number</span>
        <span class="details-value">:</span>
        <span class="details-value">${rollNo}</span>
      </div>
      <div>
        <span class="details-label">Reg. Number</span>
        <span class="details-value">:</span>
        <span class="details-value">${regNo}</span>
      </div>
      <div>
        <span class="details-label">Blood Group</span>
        <span class="details-value">:</span>
        <span class="details-value">${bloodGroup}</span>
      </div>
      <div>
        <span class="details-label">Present Address</span>
        <span class="details-value">:</span>
        <span class="address-value">
          <span id="address1">${address}</span>
          <span id="address2">Dist- ${district}, Pin- ${pinCode}</span>
        </span>
      </div>
      <div>
        <span class="details-label">Permanent Address</span>
        <span class="details-value">:</span>
        <span class="address-value">
          <span id="address1">${address}</span>
          <span id="address2">Dist- ${district}, Pin- ${pinCode}</span>
        </span>
      </div>
      <div>
        <span class="details-label">Student's Mob No.</span>
        <span class="details-value">:</span>
        <span class="details-value">${studentContactNo}</span>
      </div>
      <div>
        <span class="details-label">Guardian's Mob No.</span>
        <span class="details-value">:</span>
        <span class="details-value">${guardianNo}</span>
      </div>
    </div>
  
    <div class="signature-container">
    <img class="qr-code" src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      qrCodeData
    )}" alt="QR Code">
      <div style="text-align: center;">
        <img class="principal-signature" src="https://i.ibb.co/r48xJx2/Principal-Sig.png" alt="Principal Signature">
        <br>
        <span id="principal-des" style="font-weight: bold;">Principal</span>
        <br>
        <span id="principal-des" style="font-weight: bold;">Jalpaiguri Govt. Engg. College</span>
      </div>
    </div>    
  </div>
</body>
</html>

`;
}

export { PdfCode };
