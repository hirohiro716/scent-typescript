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
     * @deprecated
     */
    public async request(parameters: FormData | string): Promise<Response> {
        const url = new StringObject(this.url);
        const requestInit: RequestInit = {method: this.method};
        const isFormData = parameters instanceof FormData;
        if (isFormData) {
            requestInit.headers = {"Content-Type": "multipart/form-data"};
        } else {
            requestInit.headers = {"Content-Type": "application/json"};
        }
        switch(StringObject.from(this.method).lower().toString()) {
            case "post":
                requestInit.body = parameters;
                break;
            case "get":
                url.append("?");
                if (isFormData) {
                    url.append(StringObject.queryString(parameters));
                } else {
                    const parametersObject = JSON.parse(parameters);
                    url.append(StringObject.queryString(new FormData(parametersObject)));
                }
                break;
        }
        let response: Response;
        try {
            response = await fetch(url.toString(), requestInit);
        } catch (error: any) {
            throw new APIRequestError({ message: error.message});
        }
        switch (response.status) {
            case 200:
            case 201:
                return response;
            default:
                let apiRequestError: APIRequestError;
                try {
                    const json = await response.json();
                    apiRequestError = new APIRequestError(json);
                } catch (error: any) {
                    apiRequestError = new APIRequestError({ message: error.message});
                }
                throw apiRequestError;
        }
    }

    /**
     * ErrorObjectに含まれるエラーメッセージのキー。
     */
    public static readonly NAME_OF_ERROR_MESSAGE: string = "message";

    /**
     * ErrorObjectに含まれる原因オブジェクトのキー。
     */
    public static readonly NAME_OF_ERROR_CAUSE_OBJECT: string = "cause";

    /**
     * APIで発生したエラーのオブジェクトを作成する。
     * 
     * @param message 
     * @param causeObject 
     * @returns 
     */
    public static createErrorObject(message: string, causeObject?: Record<string, string>): {} {
        const object: Record<string, any> = {};
        object[API.NAME_OF_ERROR_MESSAGE] = message;
        if (causeObject) {
            object[API.NAME_OF_ERROR_CAUSE_OBJECT] = causeObject;
        }
        return object;
    }
}

/**
 * リクエストで発生したエラーのクラス。
 */
export class APIRequestError extends Error {

    /**
     * コンストラクタ。エラーのオブジェクトを指定する。
     * 
     * @param errorObject 
     */
    public constructor(errorObject: Record<string, any>) {
        super(errorObject[API.NAME_OF_ERROR_MESSAGE]);
        if (errorObject[API.NAME_OF_ERROR_CAUSE_OBJECT]) {
            this.causeMessages = errorObject[API.NAME_OF_ERROR_CAUSE_OBJECT];
            this.causePropertyNames = Object.keys(errorObject[API.NAME_OF_ERROR_CAUSE_OBJECT]);
        }
    }

    /**
     * 原因となったプロパティ名。
     */
    public readonly causePropertyNames: string[] = [];

    /**
     * 原因となったプロパティ名とメッセージの連想配列。
     */
    private readonly causeMessages: Record<string, string> = {};

    /**
     * 指定されたプロパティ名のエラーメッセージを取得する。
     * 
     * @param causePropertyName
     * @returns 
     */
    public getMessage(causePropertyName: string): string {
        const message = this.causeMessages[causePropertyName];
        if (typeof message === "undefined") {
            return "";
        }
        return message;
    }
}
