export const COOKIE_NAME = "intouch_dashboard_cookie"

export const sessionOptions = {
  cookieName: COOKIE_NAME,
  password: process.env.IRON_PASSWORD!,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  // cookieOptions: {
  //   secure: process.env.NODE_ENV === "production",
  // },
};