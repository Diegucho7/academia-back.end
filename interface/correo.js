export const SendMailOptions = {
    to: String | [],
    subject: String,
    htmlBody: String,
    attachements: Attachement | []
}

export const Attachement = {
     filename: String,
     path: string
  }