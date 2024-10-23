import Property from "../Property.js";
import StringObject from "../StringObject.js";

/**
 * APIにリクエストするクラス。このクラスでリクエストできるAPIはエラーをJSONで返すものに限る。
 */
export class API {

    /**
     * コンストラクタ。APIのURL、メソッドを指定する。
     * 
     * @param url 
     * @param method
     */
    public constructor(url: string, method: string) {
        this.url = url;
        this.method = method;
    }

    private url: string;

    private method: string;

    /**
     * リクエストエラーのメッセージを格納する場合に使用するプロパティ。
     */
    public static readonly propertyOfErrorMessage: Property = new Property("error_message", "エラーメッセージ");

    /**
     * リクエストエラーの原因となったオブジェクトを格納する場合に使用するプロパティ。
     */
    public static readonly propertyOfCauseObject: Property = new Property("cause_object", "エラーの原因となったオブジェクト");

    /**
     * リクエストエラーの原因となったプロパティ毎のエラーメッセージを格納する場合に使用するプロパティ。
     */
    public static readonly propertyOfPropertyAndErrorMessage: Property = new Property("property_and_error_message", "エラーの原因となったプロパティ毎のエラーメッセージ");

    /**
     * APIにFormDataを送信するリクエストを実行する。
     * 
     * @param formData 
     * @returns 
     * @throws APIRequestError リクエストに失敗した場合。
     */
    public async request(formData: FormData): Promise<Response>;

    /**
     * APIにJSONを送信するリクエストを実行する。
     * 
     * @param json 
     * @returns 
     * @throws APIRequestError リクエストに失敗した場合。
     */
    public async request(json: string): Promise<Response>;

    /**
     * APIにリクエストを実行する。
     * 
     * @returns 
     * @throws APIRequestError リクエストに失敗した場合。
     */
    public async request(): Promise<Response>;

    /**
     * @deprecated
     */
    public async request(parameters?: FormData | string): Promise<Response> {
        const url = new StringObject(this.url);
        const requestInit: RequestInit = {method: this.method};
        switch(StringObject.from(this.method).lower().toString()) {
            case "post":
            case "put":
                requestInit.body = parameters;
                break;
            case "get":
            case "delete":
                url.append("?");
                if (parameters instanceof FormData) {
                    url.append(StringObject.queryString(parameters));
                } else {
                    if (typeof parameters !== "undefined") {
                        const parametersObject = JSON.parse(StringObject.from(parameters).toString());
                        url.append(StringObject.queryString(new FormData(parametersObject)));
                    }
                }
                break;
        }
        let response = await fetch(url.toString(), requestInit);
        switch (response.status) {
            case 200:
            case 201:
                return response;
            default:
                let apiRequestError: APIRequestError;
                try {
                    const errorObject = await response.json();
                    apiRequestError = new APIRequestError(response.status, errorObject[API.propertyOfErrorMessage.physicalName], errorObject[API.propertyOfCauseObject.physicalName], errorObject[API.propertyOfPropertyAndErrorMessage.physicalName]);
                } catch (error: any) {
                    apiRequestError = new APIRequestError(response.status, error.message);
                }
                throw apiRequestError;
        }
    }

    /**
     * APIで発生したエラーのオブジェクトを作成する。
     * 
     * @param message エラーメッセージ。
     * @returns 
     */
    public static createErrorObject(message: string): {};

    /**
     * APIで発生したエラーのオブジェクトを作成する。
     * 
     * @param message エラーメッセージ。
     * @param causeObject エラー発生の原因となったオブジェクト。
     * @param propertyAndErrorMessage プロパティ毎のエラーメッセージ。
     * @returns 
     */
    public static createErrorObject(message: string, causeObject: Record<string, any>, propertyAndErrorMessage: Record<string, string>): {};
    
    /**
     * @deprecated
     */
    public static createErrorObject(message: string, causeObject?: Record<string, any>, propertyAndErrorMessage?: Record<string, string>): {} {
        const object: Record<string, any> = {};
        object[API.propertyOfErrorMessage.physicalName] = message;
        if (causeObject) {
            object[API.propertyOfCauseObject.physicalName] = causeObject;
        }
        if (propertyAndErrorMessage) {
            object[API.propertyOfPropertyAndErrorMessage.physicalName] = propertyAndErrorMessage;
        }
        return object;
    }
}

/**
 * リクエストで発生したエラーのクラス。
 */
export class APIRequestError extends Error {

    /**
     * コンストラクタ。
     * 
     * @param responseStatus 400や401などのHTTPレスポンスステータス。
     * @param message エラーメッセージ。
     * @param causeObject エラー発生の原因となったオブジェクト。
     * @param propertyAndErrorMessage プロパティ毎のエラーメッセージ。
     */
    public constructor(responseStatus: number, message: string, causeObject?: Record<string, any>, propertyAndErrorMessage?: Record<string, string>) {
        super(message);
        this.responseStatus = responseStatus;
        if (typeof causeObject !== "undefined") {
            this.causeObject = causeObject;
        }
        if (typeof propertyAndErrorMessage !== "undefined") {
            this.propertyAndErrorMessage = propertyAndErrorMessage;
        }
    }

    /**
     * HTTPのレスポンスステータス。
     */
    public readonly responseStatus: number;

    /**
     * エラー発生の原因となったオブジェクト。
     */
    public readonly causeObject: Record<string, any> = {};

    /**
     * プロパティ毎のエラーメッセージ。
     */
    public readonly propertyAndErrorMessage: Record<string, string> = {};
}
