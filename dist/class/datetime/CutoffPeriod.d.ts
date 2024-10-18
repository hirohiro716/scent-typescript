import { Datetime } from "./Datetime.js";
import Period from "./Period.js";
/**
 * 締め日期間のクラス。
 */
export default class CutoffPeriod {
    /**
     * コンストラクタ。
     *
     * @param cutoffDays 締める日。28以上の数値は末日を表す。
     */
    constructor(...cutoffDays: number[]);
    /**
     * 締める日。28以上の数値は末日を表す。
     */
    readonly cutoffDays: number[];
    private _baseDate;
    /**
     * 基準日。現在の時刻がデフォルト。
     */
    get baseDate(): Datetime;
    set baseDate(date: Date | Datetime);
    /**
     * 指定された月数分、基準日の前後の期間を作成する。
     *
     * @param numberOfMounths
     * @returns
     */
    createPeriods(numberOfMounths: number): Period[];
    /**
     * 指定された日付が含まれる期間を特定する。
     *
     * @param oneDate
     * @returns
     */
    findPeriod(oneDate: Datetime | Date): Period;
}
