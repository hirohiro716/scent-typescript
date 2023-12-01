
/**
 * サウンドを再生するクラス。
 */
export default class SoundPlayer {

    /**
     *  コンストラクタ。再生するメディアのURLを指定する。
     * 
     * @param mediaURL 
     */
    public constructor(mediaURL: string) {
        this._mediaURL = mediaURL;
        if (window) {
            this._audioElement = new Audio(mediaURL);
        }
    }

    private _mediaURL: string;

    /**
     * 再生するサウンドメディアのURL。
     */
    public get mediaURL(): string {
        return this._mediaURL;
    }

    private _audioElement: HTMLAudioElement | undefined;

    /**
     * 再生に使用するHTMLAudioElement。
     */
    public get audioElement(): HTMLAudioElement | undefined {
        return this._audioElement;
    }

    /**
     * 再生する音量(0〜1)。
     */
    public get volume(): number {
        if (this._audioElement) {
            return this._audioElement.volume;
        }
        return 0;
    }

    public set volume(volume: number) {
        if (this._audioElement) {
            this._audioElement.volume = volume;
        }
    }

    /**
     * サウンドを再生する。
     */
    public async play(): Promise<void> {
        if (this._audioElement) {
            await this._audioElement.play();
        }
    }

    /**
     * サウンドを一時停止する。
     */
    public async pause(): Promise<void> {
        if (this._audioElement) {
            this._audioElement.pause();
        }
    }

    /**
     * サウンドを停止する。
     */
    public async stop(): Promise<void> {
        if (this._audioElement) {
            this._audioElement.pause();
            this._audioElement.currentTime = 0;
        }
    }
}
