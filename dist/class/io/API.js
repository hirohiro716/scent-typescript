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
    constructor(url, method) {
        this.url = url;
        this.method = method;
    }
    /**
     * @deprecated
     */
    async request(parameters) {
        const url = new StringObject(this.url);
        const requestInit = { method: this.method };
        switch (StringObject.from(this.method).lower().toString()) {
            case "post":
            case "put":
                requestInit.body = parameters;
                break;
            case "get":
            case "delete":
                url.append("?");
                if (parameters instanceof FormData) {
                    url.append(StringObject.queryString(parameters));
                }
                else {
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
                let apiRequestError;
                try {
                    const errorObject = await response.json();
                    apiRequestError = new APIRequestError(response.status, errorObject[API.propertyOfErrorMessage.physicalName], errorObject[API.propertyOfCauseObject.physicalName], errorObject[API.propertyOfPropertyAndErrorMessage.physicalName]);
                }
                catch (error) {
                    apiRequestError = new APIRequestError(response.status, error.message);
                }
                throw apiRequestError;
        }
    }
    /**
     * @deprecated
     */
    static createErrorObject(message, causeObject, propertyAndErrorMessage) {
        const object = {};
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
 * リクエストエラーのメッセージを格納する場合に使用するプロパティ。
 */
API.propertyOfErrorMessage = new Property("error_message", "エラーメッセージ");
/**
 * リクエストエラーの原因となったオブジェクトを格納する場合に使用するプロパティ。
 */
API.propertyOfCauseObject = new Property("cause_object", "エラーの原因となったオブジェクト");
/**
 * リクエストエラーの原因となったプロパティ毎のエラーメッセージを格納する場合に使用するプロパティ。
 */
API.propertyOfPropertyAndErrorMessage = new Property("property_and_error_message", "エラーの原因となったプロパティ毎のエラーメッセージ");
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
    constructor(responseStatus, message, causeObject, propertyAndErrorMessage) {
        super(message);
        /**
         * エラー発生の原因となったオブジェクト。
         */
        this.causeObject = {};
        /**
         * プロパティ毎のエラーメッセージ。
         */
        this.propertyAndErrorMessage = {};
        this.responseStatus = responseStatus;
        if (typeof causeObject !== "undefined") {
            this.causeObject = causeObject;
        }
        if (typeof propertyAndErrorMessage !== "undefined") {
            this.propertyAndErrorMessage = propertyAndErrorMessage;
        }
    }
}
