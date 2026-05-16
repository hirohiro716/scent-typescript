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
    constructor(parameter) {
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
    /**
     * このIPアドレスが0.0.0.0の場合はtrueを返す。
     */
    isAny() {
        return this.ipAddress === "0.0.0.0";
    }
    /**
     * このIPアドレスがループバックの場合はtrueを返す。
     */
    isLoopback() {
        return this.ipAddress === "127.0.0.1";
    }
    /**
     * このIPアドレスがプライベートIPの場合はtrueを返す。
     */
    isPrivate() {
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
    equals(comparison) {
        return StringObject.from(comparison).equals(this.ipAddress);
    }
    /**
     * 文字列表現を取得する。
     *
     * @returns
     */
    toString() {
        return this.ipAddress;
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param value
     * @returns
     */
    static from(value) {
        return new IPAddress(value);
    }
}
