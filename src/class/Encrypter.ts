import { default as Crypto } from "crypto";
import ByteArray from "./io/ByteArray.js";
import StringObject from "./StringObject.js";

/**
 * 暗号化されたデータの型。
 * 
 * @property content 内容。
 * @property iv 初期ベクトル。
 * @property authTag 認証タグ。
 */
export type EncryptedData = {
    content: ByteArray,
    iv: ByteArray,
    authTag?: ByteArray
}

/**
 * 文字列を暗号化するクラス。
 * 
 * @author hiro
 */
export class Encrypter {

    /**
     * コンストラクタ。
     * 使用するアルゴリズムを指定する。
     * 
     * @param algorithm 
     * @param password 使用するパスワード。
     * @param salt 使用するソルト。
     */
    public constructor(algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes, password:string, salt: string);

    /**
     * コンストラクタ。
     * 使用するアルゴリズムを指定する。
     * 
     * @param algorithm 
     * @param key 使用する共通鍵。未指定の場合は自動生成される。
     */
    public constructor(algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes, key: ByteArray);

    /**
     * コンストラクタ。
     * 使用するアルゴリズムを指定する。共通鍵は自動生成される。
     * 
     * @param algorithm 
     */
    public constructor(algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes);

    /**
     * @deprecated
     */
    public constructor(algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes, passwordOrKey?: string | ByteArray, salt?: string) {
        const cipherInfo = Crypto.getCipherInfo(algorithm);
        if (typeof cipherInfo === "undefined" || typeof cipherInfo.ivLength === "undefined") {
            throw new Error("Could not find the specified algorithm.");
        }
        this._algorithm = algorithm;
        this._cipherInfo = cipherInfo;
        if (typeof passwordOrKey !== "undefined") {
            if (passwordOrKey instanceof ByteArray) {
                this._key = passwordOrKey;
            } else if (typeof salt !== "undefined") {
                this._key = new ByteArray(Crypto.scryptSync(passwordOrKey, salt, cipherInfo.keyLength));
            }
        }
    }

    private readonly _algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes;

    private _key: ByteArray | undefined = undefined;

    /**
     * このインスタンスの共通鍵。
     */
    public get key(): ByteArray | undefined {
        return this._key;
    }

    private _cipherInfo: Crypto.CipherInfo;

    /**
     * このインスタンスで使用される共通鍵の長さ。
     */
    public get keyLength(): number {
        return this._cipherInfo.keyLength;
    }

    /**
     * このインスタンスで使用される初期ベクトルの長さ。
     */
    public get ivLength(): number | undefined {
        return this._cipherInfo.ivLength;
    }

    private _authTagLength: number = 16;

    /**
     * このインスタンスで使用される認証タグの長さ。初期値は16バイト。
     */
    public get authTagLength(): number {
        return this._authTagLength;
    }

    public set authTagLength(length: number) {
        this._authTagLength = length;
    }

    /**
     * 指定された値を暗号化する。
     * 
     * @param value 
     * @returns 
     */
    public encrypt(value: string): EncryptedData {
        if (typeof this._key === "undefined") {
            this._key = new ByteArray(Crypto.randomBytes(this._cipherInfo.keyLength));
        }
        const iv = Crypto.randomBytes(this._cipherInfo.ivLength!);
        const options: any = {authTagLength: this._authTagLength};
        const cipher = Crypto.createCipheriv(this._algorithm, this._key.uint8Array, iv, options);
        const encrypted = Buffer.concat([cipher.update(StringObject.from(value).toByte()), cipher.final()]);
        let authTag = undefined;
        const cipherObject: any = cipher;
        if (typeof cipherObject.getAuthTag === "function") {
            authTag = new ByteArray(cipherObject.getAuthTag());
        }
        return {
            content: new ByteArray(encrypted),
            iv: new ByteArray(iv),
            authTag: authTag,
        }
    }
    
    /**
     * 暗号化された文字列を復号化する。
     * 
     * @param encryptedData
     */
    public decrypt(encryptedData: EncryptedData): string {
        if (typeof this._key === "undefined") {
            this._key = new ByteArray(Crypto.randomBytes(this._cipherInfo.keyLength));
        }
        const options: any = {authTagLength: this._authTagLength};
        const decipher = Crypto.createDecipheriv(this._algorithm, this._key.uint8Array, encryptedData.iv.uint8Array, options);
        const decipherObject: any = decipher;
        if (typeof encryptedData.authTag !== "undefined" && typeof decipherObject.setAuthTag === "function") {
            decipherObject.setAuthTag(encryptedData.authTag.uint8Array);
        }
        const decrypted = Buffer.concat( [decipher.update(encryptedData.content.uint8Array), decipher.final()]);
        return StringObject.from(decrypted).toString();
    }
}
