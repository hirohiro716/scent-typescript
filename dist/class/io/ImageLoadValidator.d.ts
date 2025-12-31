/**
 * 画像の読み込みを検証するクラス。
 */
export declare class ImageLoadValidator {
    /**
     * コンストラクタ。画像のURLを指定する。
     *
     * @param url
     */
    constructor(url: string);
    /**
     * 画像のURL。
     */
    readonly url: string;
    /**
     * 画像の読み込みを検証する。
     *
     * @throws ImageLoadError 読み込みに失敗した場合。
     */
    validate(): Promise<void>;
}
/**
 * 読み込みで発生したエラーのクラス。
 */
export declare class ImageLoadError extends Error {
    /**
     * コンストラクタ。
     *
     * @param causeURL 原因となったURL。
     */
    constructor(url: string);
}
