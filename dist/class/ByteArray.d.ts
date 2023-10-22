/**
 * バイト配列のクラス。
 */
export default class ByteArray {
    /**
     * コンストラクタ。Blobを指定する。
     *
     * @param blob
     */
    constructor(blob: Blob);
    private blob;
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
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param blobLike
     * @returns
     */
    static from(blobLike: Blob | Uint8Array): ByteArray;
}
