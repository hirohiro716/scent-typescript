/// <reference types="node" />
/**
 * バイト配列のクラス。
 */
export default class ByteArray {
    /**
     * コンストラクタ。Uint8Arrayを指定する。
     *
     * @param uint8Array
     */
    constructor(uint8Array: Uint8Array);
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
    static from(byteArrayLike: Uint8Array | Blob): Promise<ByteArray>;
}
