export namespace RecaptchaProps {
  export interface Response {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
  }
};

export default RecaptchaProps;