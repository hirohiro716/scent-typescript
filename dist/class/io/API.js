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
        const isFormData = parameters instanceof FormData;
        if (isFormData) {
            requestInit.headers = { "Content-Type": "multipart/form-data" };
        }
        else {
            requestInit.headers = { "Content-Type": "application/json" };
        }
        switch (StringObject.from(this.method).lower().toString()) {
            case "post":
                requestInit.body = parameters;
                break;
            case "get":
                url.append("?");
                if (isFormData) {
                    url.append(StringObject.queryString(parameters));
                }
                else {
                    const parametersObject = JSON.parse(parameters);
                    url.append(StringObject.queryString(new FormData(parametersObject)));
                }
                break;
        }
        let response;
        try {
            response = await fetch(url.toString(), requestInit);
        }
        catch (error) {
            throw new APIRequestError({ message: error.message });
        }
        switch (response.status) {
            case 200:
            case 201:
                return response;
            default:
                let apiRequestError;
                try {
                    const json = await response.json();
                    apiRequestError = new APIRequestError(json);
                }
                catch (error) {
                    apiRequestError = new APIRequestError({ message: error.message });
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
     * コンストラクタ。エラーのオブジェクトを指定する。
     *
     * @param errorObject
     */
    constructor(errorObject) {
        super(errorObject[API.NAME_OF_ERROR_MESSAGE]);
        /**
         * 原因となったプロパティ名。
         */
        this.causePropertyNames = [];
        /**
         * 原因となったプロパティ名とメッセージの連想配列。
         */
        this.causeMessages = {};
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
