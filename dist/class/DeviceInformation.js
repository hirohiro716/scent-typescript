/**
 * デバイス情報のクラス。
 */
export default class DeviceInformation {
    /**
     * コンストラクタ。
     *
     * @param object オブジェクトから復元する場合に指定する。
     */
    constructor(object) {
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.viewportWidth = 0;
        this.viewportHeight = 0;
        this.screenOrientation = "";
        this.isDarkMode = false;
        this.maximumNumberOfScreenTouchPoints = 0;
        this.numberOfHardwareConcurrency = 0;
        this.languages = [];
        this.javascriptUserAgentText = "";
        this.isChromium = false;
        this.isFirefox = false;
        this.isSafari = false;
        if (typeof object === "undefined") {
            if (window) {
                if (window.screen) {
                    this.screenWidth = window.screen.width * window.devicePixelRatio;
                    this.screenHeight = window.screen.height * window.devicePixelRatio;
                    this.viewportWidth = window.screen.availWidth;
                    this.viewportHeight = window.screen.availHeight;
                    if (window.screen.orientation && window.screen.orientation.type) {
                        this.screenOrientation = window.screen.orientation.type;
                    }
                }
                this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (window.navigator) {
                    this.maximumNumberOfScreenTouchPoints = window.navigator.maxTouchPoints;
                    this.numberOfHardwareConcurrency = window.navigator.hardwareConcurrency;
                    this.languages = [...window.navigator.languages];
                    if (window.navigator.userAgent) {
                        this.javascriptUserAgentText = window.navigator.userAgent;
                        this.isChromium = window.navigator.userAgent.toLowerCase().includes("chrom");
                        this.isFirefox = window.navigator.userAgent.toLowerCase().includes("firefox");
                        this.isSafari = window.navigator.userAgent.toLowerCase().includes("safari") && window.navigator.userAgent.toLowerCase().includes("chrom") === false;
                    }
                }
            }
        }
        else {
            this.screenWidth = object["screenWidth"];
            this.screenHeight = object["screenHeight"];
            this.viewportWidth = object["viewportWidth"];
            this.viewportHeight = object["viewportHeight"];
            this.screenOrientation = object["screenOrientation"];
            this.isDarkMode = object["isDarkMode"];
            this.maximumNumberOfScreenTouchPoints = object["maximumNumberOfScreenTouchPoints"];
            this.numberOfHardwareConcurrency = object["numberOfHardwareConcurrency"];
            this.languages = object["languages"];
            this.javascriptUserAgentText = object["javascriptUserAgentText"];
            this.isChromium = object["isChromium"];
            this.isFirefox = object["isFirefox"];
            this.isSafari = object["isSafari"];
        }
    }
    /**
     * オブジェクトに変換する。
     *
     * @returns
     */
    toObject() {
        const object = {};
        object["screenWidth"] = this.screenWidth;
        object["screenHeight"] = this.screenHeight;
        object["viewportWidth"] = this.viewportWidth;
        object["viewportHeight"] = this.viewportHeight;
        object["screenOrientation"] = this.screenOrientation;
        object["isDarkMode"] = this.isDarkMode;
        object["maximumNumberOfScreenTouchPoints"] = this.maximumNumberOfScreenTouchPoints;
        object["numberOfHardwareConcurrency"] = this.numberOfHardwareConcurrency;
        object["languages"] = this.languages;
        object["javascriptUserAgentText"] = this.javascriptUserAgentText;
        object["isChromium"] = this.isChromium;
        object["isFirefox"] = this.isFirefox;
        object["isSafari"] = this.isSafari;
        return object;
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param object オブジェクトから復元する場合に指定する。
     * @returns
     */
    static from(object) {
        return new DeviceInformation(object);
    }
}
