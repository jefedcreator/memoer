export interface MailerSendEmailTemplate {
  from?: string;
  to: string;
  subject: string;
  template: string;
  username: string;
  content: string;
}
