/**
 * サウンドを再生するクラス。
 */
export default class SoundPlayer {
    /**
     *  コンストラクタ。再生するメディアのURLを指定する。
     *
     * @param mediaURL
     */
    constructor(mediaURL) {
        this._mediaURL = mediaURL;
        if (window) {
            this._audioElement = new Audio(mediaURL);
        }
    }
    /**
     * 再生するサウンドメディアのURL。
     */
    get mediaURL() {
        return this._mediaURL;
    }
    /**
     * 再生に使用するHTMLAudioElement。
     */
    get audioElement() {
        return this._audioElement;
    }
    /**
     * 再生する音量(0〜1)。
     */
    get volume() {
        if (this._audioElement) {
            return this._audioElement.volume;
        }
        return 0;
    }
    set volume(volume) {
        if (this._audioElement) {
            this._audioElement.volume = volume;
        }
    }
    /**
     * サウンドを再生する。
     */
    async play() {
        if (this._audioElement) {
            await this._audioElement.play();
        }
    }
    /**
     * サウンドを一時停止する。
     */
    async pause() {
        if (this._audioElement) {
            this._audioElement.pause();
        }
    }
    /**
     * サウンドを停止する。
     */
    async stop() {
        if (this._audioElement) {
            this._audioElement.pause();
            this._audioElement.currentTime = 0;
        }
    }
}
