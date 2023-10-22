/**
 * バイト配列のクラス。
 */
export default class ByteArray {
    /**
     * コンストラクタ。Blobを指定する。
     *
     * @param blob
     */
    constructor(blob) {
        this.blob = blob;
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
    toUnit8Array() {
        return new Promise((resolve, reject) => {
            const arrayBuffer = this.blob.arrayBuffer().then((arrayBuffer) => {
                resolve(new Uint8Array(arrayBuffer));
            }).catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param blobLike
     * @returns
     */
    static from(blobLike) {
        if (blobLike instanceof Blob) {
            return new ByteArray(blobLike);
        }
        const uint8Array = blobLike;
        return new ByteArray(new Blob([uint8Array]));
    }
}
