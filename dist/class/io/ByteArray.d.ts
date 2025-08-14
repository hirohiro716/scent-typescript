/// <reference types="node" />
/**
 * バイト配列のクラス。
 */
export default class ByteArray {
    /**
     * コンストラクタ。
     *
     * @param byteArrayLike バイト配列またはバイト配列のHEX表現文字列を指定する。
     */
    constructor(byteArrayLike: Uint8Array | string);
    /**
     * コンストラクタで指定されたUint8Arrayインスタンス。
     */
    readonly uint8Array: Uint8Array;
    /**
     * 初期ファイル名を指定して、バイト配列をフロントでダウンロードする。
     *
     * @param defaultFilename
     */
    download(defaultFilename: string): void;
    /**
     * このバイト配列をUnit8Arrayに変換する。
     *
     * @returns
     */
    toBlob(): Blob;
    /**
     * このバイト配列をBufferに変換する。
     *
     * @returns
     */
    toBuffer(): Buffer;
    /**
     * このバイト配列を文字列に変換する。
     *
     * @returns
     */
    toString(): string;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param byteArrayLike
     * @returns
     */
    static from(byteArrayLike: Uint8Array | string | Blob | Buffer): Promise<ByteArray>;
}
