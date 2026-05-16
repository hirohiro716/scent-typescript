/**
 * IPアドレスのクラス。
 */
export default class IPAddress {
    /**
     * コンストラクタ。
     *
     * @param parameter IPアドレスの文字列、またはRequestヘッダーを指定する。
     */
    constructor(parameter: string | Headers);
    private readonly ipAddress;
    /**
     * このIPアドレスが0.0.0.0の場合はtrueを返す。
     */
    isAny(): boolean;
    /**
     * このIPアドレスがループバックの場合はtrueを返す。
     */
    isLoopback(): boolean;
    /**
     * このIPアドレスがプライベートIPの場合はtrueを返す。
     */
    isPrivate(): boolean;
    /**
     * 指定された値がこのIPアドレスと同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equals(comparison: string | IPAddress): boolean;
    /**
     * 文字列表現を取得する。
     *
     * @returns
     */
    toString(): string;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param value
     * @returns
     */
    static from(value: string | Headers): IPAddress;
}
