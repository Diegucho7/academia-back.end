

// const async sendEmail( options: SendMailOptions ): Promise<boolean> {

//     const { to, subject, htmlBody, attachements = [] } = options;


//     try {

//       const sentInformation = await this.transporter.sendMail( {
//         to: to,
//         subject: subject,
//         html: htmlBody,
//         attachments: attachements,
//       });

//       // console.log( sentInformation );

//       return true;
//     } catch ( error ) {
//       return false;
//     }

//   }