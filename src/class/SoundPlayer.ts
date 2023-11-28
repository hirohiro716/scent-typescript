
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
        this.mediaURL = mediaURL;
        this.audioElement = new Audio(mediaURL);
    }

    /**
     * 再生するサウンドメディアのURL。
     */
    public readonly mediaURL: string;

    /**
     * 再生に使用するHTMLAudioElement。
     */
    public readonly audioElement: HTMLAudioElement;

    /**
     * 再生する音量(0〜1)。
     */
    public get volume(): number {
        return this.audioElement.volume;
    }

    public set volume(volume: number) {
        this.audioElement.volume = volume;
    }

    /**
     * サウンドを再生する。
     */
    public async play(): Promise<void> {
        await this.audioElement.play();
    }

    /**
     * サウンドを一時停止する。
     */
    public async pause(): Promise<void> {
        this.audioElement.pause();
    }

    /**
     * サウンドを停止する。
     */
    public async stop(): Promise<void> {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }
}
