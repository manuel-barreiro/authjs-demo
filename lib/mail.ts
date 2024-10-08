import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async (email: string, token: string) => {
  console.log("Sending email verification to", email);
  try {
    const send = await resend.emails.send({
      from: "Reformer Studio <onboarding@resend.dev>",
      to: email,
      subject: "Verifica tu correo electrónico",
      html: `
        <p>Clickea el siguiente enlace para verificar tu cuenta</p>
        <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Verify email</a>
      `,
    });

    console.log("Confirmation email sent to", email);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};
