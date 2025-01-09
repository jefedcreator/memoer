import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { Service } from "typedi";
import { config } from "@config";
import { MailerSendEmailTemplate } from "@types";
import { Exception } from "@middlewares/error.middleware";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const mailerSend = new MailerSend({
  apiKey: config.mail.apiKey,
});

let configuration = {
  service: "gmail",
  auth: {
    user: config.mail.email,
    pass: config.mail.password,
  },
};

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

@Service()
export class Mailer {
  constructor() {}
  private transporter = nodemailer.createTransport(configuration);

  private async mailersend(options: MailerSendEmailTemplate) {
    try {
      const sentFrom = new Sender(config.mail.domain, config.mail.sender);
      const recipients = [new Recipient(options.to, options.username)];
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(options.subject)
        .setHtml(options.template)
        .setText(options.content);
      await mailerSend.email.send(emailParams);
    } catch (error: any) {
      throw new Exception(400, error.body.message);
    }
  }

  async nodemailersend(options: MailerSendEmailTemplate) {
    try {
      let response = {
        body: {
          name: options.username,
          intro: options.subject,
          //   action: {
          //     instructions: "To get started with Blesstours, please click here:",
          //     button: {
          //       color: "#22BC66", // Optional action button color
          //       text: "Join the tour",
          //       link: `https://blesstours.vercel.app/user/join/${existingBooking.tourId}`,
          //     },
          //   },
          outro: "Looking forward to more notes",
        },
      };
      console.log("options", options);

      let mail = MailGenerator.generate(response);

      let message = {
        from: config.mail.email,
        to: options.to,
        subject: options.subject,
        html: mail,
      };
      await this.transporter.sendMail(message);
    } catch (error: any) {
      throw new Exception(400, error.body.message);
    }
  }

  async sendEmail(options: MailerSendEmailTemplate) {
    await this.mailersend(options);
  }
}
