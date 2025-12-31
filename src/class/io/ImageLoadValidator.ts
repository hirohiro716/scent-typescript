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
    public constructor(url: string) {
        this.url = url;
    }

    /**
     * 画像のURL。
     */
    public readonly url: string;

    /**
     * 画像の読み込みを検証する。
     * 
     * @throws ImageLoadError 読み込みに失敗した場合。
     */
    public async validate(): Promise<void> {
        const url = new StringObject(this.url);
        return new Promise<void>((resolve, reject) => {
            const img: HTMLImageElement = window.document.createElement("img");
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
    public constructor(url: string) {
        const message = new StringObject("The image could not be loaded. The URL that caused this is \"");
        message.append(url);
        message.append("\".");
        super(message.toString());
    }
}
