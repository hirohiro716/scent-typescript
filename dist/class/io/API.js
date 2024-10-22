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
                requestInit.body = parameters;
                break;
            case "get":
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
                    const json = await response.json();
                    apiRequestError = new APIRequestError(response.status, json);
                }
                catch (error) {
                    apiRequestError = new APIRequestError(response.status, { message: error.message });
                }
                throw apiRequestError;
        }
    }
    /**
     * APIで発生したエラーのオブジェクトを作成する。
     *
     * @param message
     * @param causeObject
     * @returns
     */
    static createErrorObject(message, causeObject) {
        const object = {};
        object[API.NAME_OF_ERROR_MESSAGE] = message;
        if (causeObject) {
            object[API.NAME_OF_ERROR_CAUSE_OBJECT] = causeObject;
        }
        return object;
    }
}
/**
 * ErrorObjectに含まれるエラーメッセージのキー。
 */
API.NAME_OF_ERROR_MESSAGE = "message";
/**
 * ErrorObjectに含まれる原因オブジェクトのキー。
 */
API.NAME_OF_ERROR_CAUSE_OBJECT = "cause";
/**
 * リクエストで発生したエラーのクラス。
 */
export class APIRequestError extends Error {
    /**
     * コンストラクタ。レスポンスステータスとエラーのオブジェクトを指定する。
     *
     * @param responseStatus
     * @param errorObject
     */
    constructor(responseStatus, errorObject) {
        super(errorObject[API.NAME_OF_ERROR_MESSAGE]);
        /**
         * 原因となったプロパティ名。
         */
        this.causePropertyNames = [];
        /**
         * 原因となったプロパティ名とメッセージの連想配列。
         */
        this.causeMessages = {};
        this.responseStatus = responseStatus;
        if (errorObject[API.NAME_OF_ERROR_CAUSE_OBJECT]) {
            this.causeMessages = errorObject[API.NAME_OF_ERROR_CAUSE_OBJECT];
            this.causePropertyNames = Object.keys(errorObject[API.NAME_OF_ERROR_CAUSE_OBJECT]);
        }
    }
    /**
     * 指定されたプロパティ名のエラーメッセージを取得する。
     *
     * @param causePropertyName
     * @returns
     */
    getMessage(causePropertyName) {
        const message = this.causeMessages[causePropertyName];
        if (typeof message === "undefined") {
            return "";
        }
        return message;
    }
}
