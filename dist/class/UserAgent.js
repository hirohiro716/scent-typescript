import StringObject from "./StringObject.js";
/**
 * ユーザーエージェントのクラス。
 */
export default class UserAgent {
    /**
     * 文字列表現を取得する。
     *
     * @returns
     */
    static toString() {
        const userAgent = new StringObject();
        if (window) {
            userAgent.append(window.navigator.userAgent);
        }
        return userAgent.toString();
    }
    /**
     * クライアントのユーザーエージェントがChromium系と判断できる場合にtrueを返す。
     *
     * @returns
     */
    static isChromium() {
        return this.toString().toLowerCase().includes("chrom");
    }
    /**
     * クライアントのユーザーエージェントがFirefox系と判断できる場合にtrueを返す。
     *
     * @returns
     */
    static isFirefox() {
        return this.toString().toLowerCase().includes("firefox");
    }
    /**
     * クライアントのユーザーエージェントがSafariと判断できる場合にtrueを返す。
     *
     * @returns
     */
    static isSafari() {
        return this.toString().toLowerCase().includes("safari") && this.toString().toLowerCase().includes("chrom") == false;
    }
}
