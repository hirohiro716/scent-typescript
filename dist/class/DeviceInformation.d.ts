/**
 * デバイス情報のクラス。
 */
export default class DeviceInformation {
    /**
     * コンストラクタ。
     *
     * @param object オブジェクトから復元する場合に指定する。
     */
    constructor(object?: Record<string, any>);
    /**
     * 画面の幅。
     */
    readonly screenWidth: number;
    /**
     * 画面の高さ。
     */
    readonly screenHeight: number;
    /**
     * ビューポートの幅。
     */
    readonly viewportWidth: number;
    /**
     * ビューポートの高さ。
     */
    readonly viewportHeight: number;
    /**
     * 画面の向き。
     */
    readonly screenOrientation: string;
    /**
     * 画面の最大タッチポイント数。
     */
    readonly maximumNumberOfScreenTouchPoints: number;
    /**
     * ハードウェア同時実行数。
     */
    readonly numberOfHardwareConcurrency: number;
    /**
     * 言語。
     */
    readonly languages: string[];
    /**
     * JavaScriptのユーザーエージェント文字列。
     */
    readonly javascriptUserAgentText: string;
    /**
     * Chromium系と判断できる場合にtrue。
     */
    readonly isChromium: boolean;
    /**
     * Firefox系と判断できる場合にtrue。
     */
    readonly isFirefox: boolean;
    /**
     * Safariと判断できる場合にtrue。
     */
    readonly isSafari: boolean;
    /**
     * オブジェクトに変換する。
     *
     * @returns
     */
    toObject(): Record<string, any>;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param object オブジェクトから復元する場合に指定する。
     * @returns
     */
    static from(object?: Record<string, any>): DeviceInformation;
}
