/**
 * バイト配列のクラス。
 */
export default class ByteArray {
    /**
     * コンストラクタ。Blobを指定する。
     *
     * @param blob
     */
    constructor(blobLike) {
        if (blobLike instanceof Blob) {
            this.blob = blobLike;
        }
        else {
            const uint8Array = blobLike;
            this.blob = new Blob([uint8Array]);
        }
    }
    /**
     * 初期ファイル名を指定して、バイト配列をフロントでダウンロードする。
     *
     * @param defaultFilename
     */
    download(defaultFilename) {
        const url = URL.createObjectURL(this.blob);
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
    async toUnit8Array() {
        const arrayBuffer = await this.blob.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }
    /**
     * このバイト配列をBufferに変換する。
     *
     * @returns
     */
    async toBuffer() {
        const arrayBuffer = await this.blob.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param blobLike
     * @returns
     */
    static from(blobLike) {
        return new ByteArray(blobLike);
    }
}
