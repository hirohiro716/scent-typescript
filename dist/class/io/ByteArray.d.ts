/// <reference types="node" />
/**
 * バイト配列のクラス。
 */
export default class ByteArray {
    /**
     * コンストラクタ。Blobを指定する。
     *
     * @param blob
     */
    constructor(blobLike: Blob | Uint8Array);
    /**
     * コンストラクタで指定されたBlob。
     */
    readonly blob: Blob;
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
    toUnit8Array(): Promise<Uint8Array>;
    /**
     * このバイト配列をBufferに変換する。
     *
     * @returns
     */
    toBuffer(): Promise<Buffer>;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param blobLike
     * @returns
     */
    static from(blobLike: Blob | Uint8Array): ByteArray;
}
