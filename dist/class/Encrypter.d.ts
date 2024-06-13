/// <reference types="node" />
import { default as Crypto } from "crypto";
import ByteArray from "./io/ByteArray.js";
/**
 * 暗号化されたデータの型。
 *
 * @property content 内容。
 * @property iv 初期ベクトル。
 * @property authTag 認証タグ。
 */
export type EncryptedData = {
    content: ByteArray;
    iv: ByteArray;
    authTag?: ByteArray;
};
/**
 * 文字列を暗号化するクラス。
 *
 * @author hiro
 */
export declare class Encrypter {
    /**
     * コンストラクタ。
     * 使用するアルゴリズムを指定する。
     *
     * @param algorithm
     * @param password 使用するパスワード。
     * @param salt 使用するソルト。
     */
    constructor(algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes, password: string, salt: string);
    /**
     * コンストラクタ。
     * 使用するアルゴリズムを指定する。
     *
     * @param algorithm
     * @param key 使用する共通鍵。未指定の場合は自動生成される。
     */
    constructor(algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes, key: ByteArray);
    /**
     * コンストラクタ。
     * 使用するアルゴリズムを指定する。共通鍵は自動生成される。
     *
     * @param algorithm
     */
    constructor(algorithm: Crypto.CipherCCMTypes | Crypto.CipherOCBTypes | Crypto.CipherGCMTypes);
    private readonly _algorithm;
    private _key;
    /**
     * このインスタンスの共通鍵。
     */
    get key(): ByteArray | undefined;
    private _cipherInfo;
    /**
     * このインスタンスで使用される共通鍵の長さ。
     */
    get keyLength(): number;
    /**
     * このインスタンスで使用される初期ベクトルの長さ。
     */
    get ivLength(): number | undefined;
    private _authTagLength;
    /**
     * このインスタンスで使用される認証タグの長さ。初期値は16バイト。
     */
    get authTagLength(): number;
    set authTagLength(length: number);
    /**
     * 指定された値を暗号化する。
     *
     * @param value
     * @returns
     */
    encrypt(value: string): EncryptedData;
    /**
     * 暗号化された文字列を復号化する。
     *
     * @param encryptedData
     */
    decrypt(encryptedData: EncryptedData): string;
}
