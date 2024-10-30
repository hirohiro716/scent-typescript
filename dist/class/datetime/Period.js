import { Datetime } from "./Datetime.js";
/**
 * 期間のクラス。
 */
export default class Period {
    /**
     * コンストラクタ。開始日時と終了日時を指定する。
     *
     * @param startDatetime
     * @param endDatetime
     */
    constructor(startDatetime, endDatetime) {
        if (startDatetime instanceof Datetime) {
            this.startDatetime = startDatetime;
        }
        else {
            this.startDatetime = Datetime.from(startDatetime);
        }
        if (endDatetime instanceof Datetime) {
            this.endDatetime = endDatetime;
        }
        else {
            this.endDatetime = Datetime.from(endDatetime);
        }
    }
    /**
     * 指定された日時が期間内の場合はtrueを返す。
     *
     * @param datetime
     * @returns
     */
    contains(datetime) {
        let milliseconds;
        if (datetime instanceof Datetime) {
            milliseconds = datetime.getAllMilliseconds();
        }
        else {
            milliseconds = Datetime.from(datetime).getAllMilliseconds();
        }
        return this.startDatetime.getAllMilliseconds() <= milliseconds && milliseconds <= this.endDatetime.getAllMilliseconds();
    }
    /**
     * @deprecated
     */
    equals(parameter1, endDate) {
        let comparison;
        if (parameter1 instanceof Period) {
            comparison = parameter1;
        }
        else {
            let startDateOfComparison;
            if (parameter1 instanceof Datetime) {
                startDateOfComparison = parameter1;
            }
            else {
                startDateOfComparison = new Datetime(parameter1);
            }
            let endDateOfComparison;
            if (endDate) {
                if (endDate instanceof Datetime) {
                    endDateOfComparison = endDate;
                }
                else {
                    endDateOfComparison = new Datetime(endDate);
                }
            }
            if (startDateOfComparison && endDateOfComparison) {
                comparison = new Period(startDateOfComparison, endDateOfComparison);
            }
        }
        return typeof comparison !== "undefined" && this.startDatetime.equals(comparison.startDatetime) && this.endDatetime.equals(comparison.endDatetime);
    }
    /**
     * ミリ秒数で取得する。
     *
     * @returns
     */
    toMilliseconds() {
        return this.endDatetime.getAllMilliseconds() - this.startDatetime.getAllMilliseconds();
    }
    /**
     * 秒数で取得する。
     *
     * @returns
     */
    toSeconds() {
        return this.toMilliseconds() / 1000;
    }
    /**
     * 分数で取得する。
     *
     * @returns
     */
    toMinutes() {
        return this.toMilliseconds() / 1000 / 60;
    }
    /**
     * 時間数で取得する。
     *
     * @returns
     */
    toHours() {
        return this.toMilliseconds() / 1000 / 60 / 60;
    }
    /**
     * 日数で取得する。
     *
     * @returns
     */
    toDays() {
        return this.toMilliseconds() / 1000 / 60 / 60 / 24;
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param startDatetime
     * @param endDatetime
     */
    static from(startDatetime, endDatetime) {
        return new Period(startDatetime, endDatetime);
    }
}
