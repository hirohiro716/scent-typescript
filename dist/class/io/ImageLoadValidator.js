import StringObject from "../StringObject.js";
/**
 * 画像の読み込みを検証するクラス。
 */
export class ImageLoadValidator {
    /**
     * コンストラクタ。画像のURLを指定する。
     *
     * @param url
     */
    constructor(url) {
        this.url = url;
    }
    /**
     * 画像の読み込みを検証する。
     *
     * @throws ImageLoadError 読み込みに失敗した場合。
     */
    async validate() {
        const url = new StringObject(this.url);
        return new Promise((resolve, reject) => {
            const img = window.document.createElement("img");
            img.onload = () => resolve();
            img.onerror = () => reject(new ImageLoadError(url.toString()));
            img.src = url.toString();
        });
    }
}
/**
 * 読み込みで発生したエラーのクラス。
 */
export class ImageLoadError extends Error {
    /**
     * コンストラクタ。
     *
     * @param causeURL 原因となったURL。
     */
    constructor(url) {
        const message = new StringObject("The image could not be loaded. The URL that caused this is \"");
        message.append(url);
        message.append("\".");
        super(message.toString());
    }
}
