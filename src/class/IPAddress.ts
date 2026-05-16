import StringObject from "./StringObject.js";

/**
 * IPアドレスのクラス。
 */
export default class IPAddress {

    /**
     * コンストラクタ。
     * 
     * @param parameter IPアドレスの文字列、またはRequestヘッダーを指定する。
     */
    public constructor(parameter: string | Headers) {
        const address = new StringObject();
        if (typeof parameter === "string") {
            address.append(parameter);
        }
        if (parameter instanceof Headers) {
            address.append(parameter.get("x-real-ip"));
            if (address.length() === 0) {
                address.set(parameter.get("x-forwarded-for"));
            }
        }
        address.extract("[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}");
        if (address.length() === 0) {
            address.append("0.0.0.0");
        }
        this.ipAddress = address.toString();
    }

    private readonly ipAddress: string;

    /**
     * このIPアドレスが0.0.0.0の場合はtrueを返す。
     */
    public isAny(): boolean {
        return this.ipAddress === "0.0.0.0";
    }

    /**
     * このIPアドレスがループバックの場合はtrueを返す。
     */
    public isLoopback(): boolean {
        return this.ipAddress === "127.0.0.1";
    }

    /**
     * このIPアドレスがプライベートIPの場合はtrueを返す。
     */
    public isPrivate(): boolean {
        if (this.isLoopback()) {
            return true;
        }
        if (this.ipAddress.match("10\.") !== null) {
            return true;
        }
        if (this.ipAddress.match("172\.(1[6-9]|2[0-9]|3[01])\.") !== null) {
            return true;
        }
        if (this.ipAddress.match("192\.168\.") !== null) {
            return true;
        }
        return false;
    }

    /**
     * 指定された値がこのIPアドレスと同じ場合にtrueを返す。
     * 
     * @param comparison 
     * @returns 
     */
    public equals(comparison: string | IPAddress): boolean {
        return StringObject.from(comparison).equals(this.ipAddress);
    }

    /**
     * 文字列表現を取得する。
     * 
     * @returns 
     */
    public toString(): string {
        return this.ipAddress;
    }

    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     * 
     * @param value 
     * @returns 
     */
    public static from(value: string | Headers): IPAddress {
        return new IPAddress(value);
    }
}
