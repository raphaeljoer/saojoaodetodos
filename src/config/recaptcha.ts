export namespace Recaptcha {
  export namespace V3 {
    export const siteKey = process.env.SUAMUSICA_SJDT_RECAPTCHA_V3_SITE_KEY;
    export const secretKey = process.env.SUAMUSICA_SJDT_RECAPTCHA_V3_SECRET_KEY;
    export const action = "vote"
    export const minimumScore = 0.5;
    export const apiUrl = 'https://www.google.com/recaptcha/api/siteverify';
  }
};

export default Recaptcha;