/**
 * APIにリクエストするクラス。このクラスでリクエストできるAPIはエラーをJSONで返すものに限る。
 */
export declare class API {
    /**
     * コンストラクタ。APIのURL、メソッドを指定する。
     *
     * @param url
     * @param method
     */
    constructor(url: string, method: string);
    private url;
    private method;
    /**
     * APIにFormDataを送信するリクエストを実行する。
     *
     * @param formData
     * @returns
     * @throws APIRequestError リクエストに失敗した場合。
     */
    request(formData: FormData): Promise<Response>;
    /**
     * APIにJSONを送信するリクエストを実行する。
     *
     * @param json
     * @returns
     * @throws APIRequestError リクエストに失敗した場合。
     */
    request(json: string): Promise<Response>;
    /**
     * ErrorObjectに含まれるエラーメッセージのキー。
     */
    static readonly NAME_OF_ERROR_MESSAGE: string;
    /**
     * ErrorObjectに含まれる原因オブジェクトのキー。
     */
    static readonly NAME_OF_ERROR_CAUSE_OBJECT: string;
    /**
     * APIで発生したエラーのオブジェクトを作成する。
     *
     * @param message
     * @param causeObject
     * @returns
     */
    static createErrorObject(message: string, causeObject?: Record<string, string>): {};
}
/**
 * リクエストで発生したエラーのクラス。
 */
export declare class APIRequestError extends Error {
    /**
     * コンストラクタ。エラーのオブジェクトを指定する。
     *
     * @param errorObject
     */
    constructor(errorObject: Record<string, any>);
    /**
     * 原因となったプロパティ名。
     */
    readonly causePropertyNames: string[];
    /**
     * 原因となったプロパティ名とメッセージの連想配列。
     */
    private readonly causeMessages;
    /**
     * 指定されたプロパティ名のエラーメッセージを取得する。
     *
     * @param causePropertyName
     * @returns
     */
    getMessage(causePropertyName: string): string;
}
