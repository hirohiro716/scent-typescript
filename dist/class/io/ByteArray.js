import StringObject from "../StringObject.js";
/**
 * バイト配列のクラス。
 */
export default class ByteArray {
    /**
     * コンストラクタ。
     *
     * @param byteArrayLike バイト配列またはバイト配列のHEX表現文字列を指定する。
     */
    constructor(byteArrayLike) {
        if (typeof byteArrayLike === "string") {
            const matches = byteArrayLike.match(/[0-9a-fA-F]{2}/gi);
            if (matches !== null) {
                this.uint8Array = new Uint8Array(matches.map((hex) => parseInt(hex, 16)));
            }
            else {
                this.uint8Array = new Uint8Array();
            }
        }
        else {
            this.uint8Array = byteArrayLike;
        }
    }
    /**
     * 初期ファイル名を指定して、バイト配列をフロントでダウンロードする。
     *
     * @param defaultFilename
     */
    download(defaultFilename) {
        const url = URL.createObjectURL(this.toBlob());
        const link = document.createElement('a');
        link.href = url;
        link.download = defaultFilename;
        link.click();
        URL.revokeObjectURL(url);
    }
    /**
     * このバイト配列をUnit8Arrayに変換する。
     *
     * @returns
     */
    toBlob() {
        return new Blob([this.uint8Array.buffer]);
    }
    /**
     * このバイト配列をBufferに変換する。
     *
     * @returns
     */
    toBuffer() {
        return this.uint8Array.buffer;
    }
    /**
     * このバイト配列を文字列に変換する。
     *
     * @returns
     */
    toString() {
        const hex = new StringObject();
        for (const bit of this.uint8Array) {
            hex.append(StringObject.from(bit.toString(16)).paddingLeft(2, "0"));
        }
        return hex.toString();
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param byteArrayLike
     * @returns
     */
    static async from(byteArrayLike) {
        if (byteArrayLike instanceof Blob) {
            const arrayBuffer = await byteArrayLike.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            return new ByteArray(uint8Array);
        }
        if (byteArrayLike instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(byteArrayLike);
            return new ByteArray(uint8Array);
        }
        return new ByteArray(byteArrayLike);
    }
}
