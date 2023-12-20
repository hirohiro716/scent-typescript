/**
 * サウンドを再生するクラス。
 */
export default class SoundPlayer {
    /**
     *  コンストラクタ。再生するメディアのURLを指定する。
     *
     * @param mediaURL
     */
    constructor(mediaURL: string);
    private _mediaURL;
    /**
     * 再生するサウンドメディアのURL。
     */
    get mediaURL(): string;
    private _audioElement;
    /**
     * 再生に使用するHTMLAudioElement。
     */
    get audioElement(): HTMLAudioElement | undefined;
    /**
     * 再生する音量(0〜1)。
     */
    get volume(): number;
    set volume(volume: number);
    /**
     * サウンドを再生する。
     */
    play(): Promise<void>;
    /**
     * サウンドを一時停止する。
     */
    pause(): Promise<void>;
    /**
     * サウンドを停止する。
     */
    stop(): Promise<void>;
}
