/**
 * バイト配列のクラス。
 */
export default class ByteArray {

    /**
     * コンストラクタ。Blobを指定する。
     * 
     * @param blob 
     */
    public constructor(blobLike: Blob | Uint8Array) {
        if (blobLike instanceof Blob) {
            this.blob = blobLike;
        } else {
            const uint8Array: Uint8Array = blobLike;
            this.blob = new Blob([uint8Array]);
        }
    }

    /**
     * コンストラクタで指定されたBlob。
     */
    public readonly blob: Blob;

    /**
     * 初期ファイル名を指定して、バイト配列をフロントでダウンロードする。
     * 
     * @param defaultFilename 
     */
    public download(defaultFilename: string): void {
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
    public toUnit8Array(): Promise<Uint8Array> {
        return new Promise<Uint8Array>((resolve, reject) => {
            this.blob.arrayBuffer().then((arrayBuffer) => {
                resolve(new Uint8Array(arrayBuffer));
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * このバイト配列をBufferに変換する。
     * 
     * @returns 
     */
    public toBuffer(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            this.blob.arrayBuffer().then((arrayBuffer) => {
                resolve(Buffer.from(arrayBuffer));
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
    public static from(blobLike: Blob | Uint8Array): ByteArray {
        return new ByteArray(blobLike);
    }
}
