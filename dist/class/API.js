import StringObject from "./StringObject.js";
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
     * APIにリクエストを実行する。
     *
     * @param formData
     * @returns
     */
    request(formData) {
        return new Promise((resolve, reject) => {
            const url = new StringObject(this.url);
            const requestInit = { method: this.method };
            switch (StringObject.from(this.method).lower().toString()) {
                case "post":
                    requestInit.body = formData;
                    break;
                case "get":
                    url.append("?");
                    url.append(StringObject.queryString(formData));
                    break;
            }
            fetch(url.toString(), requestInit).then((response) => {
                switch (response.status) {
                    case 200:
                    case 201:
                        resolve(response);
                        break;
                    default:
                        response.json().then((json) => {
                            reject(new APIRequestError(json));
                        }).catch((error) => {
                            reject(new APIRequestError({ message: error.message }));
                        });
                        break;
                }
            }).catch((error) => {
                reject(new APIRequestError({ message: error.message }));
            });
        });
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
