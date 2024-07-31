export interface ISendEmail {
  receiverEmail: string;
  subject: string;
  emailTemplate: string;
  replyto: string; 
}