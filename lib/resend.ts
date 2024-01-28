import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domin = process.env.NEXT_PUBLIC_APP_URL

export const sendTowFactorTokenEmail = async (email: string, token: string) => {
    if (process.env.WEBSITE_EMAIL) {
        await resend.emails.send({
            from: process.env.WEBSITE_EMAIL,
            to: email,
            subject: "Code for ClassRoom",
            html: `<p>Your 2FA code: ${token}.</p>`
        })
    }
}