import Property from "../Property.js";
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
     * リクエストエラーのメッセージを格納する場合に使用するプロパティ。
     */
    static readonly propertyOfErrorMessage: Property;
    /**
     * リクエストエラーの原因となったオブジェクトを格納する場合に使用するプロパティ。
     */
    static readonly propertyOfCauseObject: Property;
    /**
     * リクエストエラーの原因となったプロパティ毎のエラーメッセージを格納する場合に使用するプロパティ。
     */
    static readonly propertyOfPropertyAndErrorMessage: Property;
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
     * APIにリクエストを実行する。
     *
     * @returns
     * @throws APIRequestError リクエストに失敗した場合。
     */
    request(): Promise<Response>;
    /**
     * APIで発生したエラーのオブジェクトを作成する。
     *
     * @param message エラーメッセージ。
     * @returns
     */
    static createErrorObject(message: string): {};
    /**
     * APIで発生したエラーのオブジェクトを作成する。
     *
     * @param message エラーメッセージ。
     * @param causeObject エラー発生の原因となったオブジェクト。
     * @param propertyAndErrorMessage プロパティ毎のエラーメッセージ。
     * @returns
     */
    static createErrorObject(message: string, causeObject: Record<string, any>, propertyAndErrorMessage: Record<string, string>): {};
}
/**
 * リクエストで発生したエラーのクラス。
 */
export declare class APIRequestError extends Error {
    /**
     * コンストラクタ。
     *
     * @param responseStatus 400や401などのHTTPレスポンスステータス。
     * @param message エラーメッセージ。
     * @param causeObject エラー発生の原因となったオブジェクト。
     * @param propertyAndErrorMessage プロパティ毎のエラーメッセージ。
     */
    constructor(responseStatus: number, message: string, causeObject?: Record<string, any>, propertyAndErrorMessage?: Record<string, string>);
    /**
     * HTTPのレスポンスステータス。
     */
    readonly responseStatus: number;
    /**
     * エラー発生の原因となったオブジェクト。
     */
    readonly causeObject: Record<string, any>;
    /**
     * プロパティ毎のエラーメッセージ。
     */
    readonly propertyAndErrorMessage: Record<string, string>;
}
