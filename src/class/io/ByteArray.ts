/**
 * バイト配列のクラス。
 */
export default class ByteArray {

    /**
     * コンストラクタ。Uint8Arrayを指定する。
     * 
     * @param uint8Array
     */
    public constructor(uint8Array: Uint8Array) {
        this.uint8Array = uint8Array;
    }

    /**
     * コンストラクタで指定されたUint8Arrayインスタンス。
     */
    public readonly uint8Array: Uint8Array;

    /**
     * 初期ファイル名を指定して、バイト配列をフロントでダウンロードする。
     * 
     * @param defaultFilename 
     */
    public download(defaultFilename: string): void {
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
    public toBlob(): Blob {
        return new Blob([this.uint8Array]);
    }

    /**
     * このバイト配列をBufferに変換する。
     * 
     * @returns 
     */
    public toBuffer(): Buffer {
        return Buffer.from(this.uint8Array);
    }

    /**
     * このバイト配列を文字列に変換する。
     * 
     * @returns 
     */
    public toString(): string {
        return this.toBuffer().toString("hex");
    }

    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     * 
     * @param byteArrayLike 
     * @returns 
     */
    public static async from(byteArrayLike: Uint8Array | Blob): Promise<ByteArray> {
        if (byteArrayLike instanceof Blob) {
            const arrayBuffer = await byteArrayLike.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            return new ByteArray(uint8Array);
        }
        return new ByteArray(byteArrayLike);
    }
}
