/**
 * ユーザーエージェントのクラス。
 */
export default class UserAgent {
    /**
     * 文字列表現を取得する。
     *
     * @returns
     */
    static toString(): string;
    /**
     * クライアントのユーザーエージェントがChromium系と判断できる場合にtrueを返す。
     *
     * @returns
     */
    static isChromium(): boolean;
    /**
     * クライアントのユーザーエージェントがFirefox系と判断できる場合にtrueを返す。
     *
     * @returns
     */
    static isFirefox(): boolean;
    /**
     * クライアントのユーザーエージェントがSafariと判断できる場合にtrueを返す。
     *
     * @returns
     */
    static isSafari(): boolean;
}
