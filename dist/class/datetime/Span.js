import { Datetime } from "./Datetime.js";
/**
 * 期間のクラス。
 */
export default class Span {
    /**
     * コンストラクタ。開始日と終了日を指定する。
     *
     * @param startDate
     * @param endDate
     */
    constructor(startDate, endDate) {
        if (startDate instanceof Datetime) {
            this.startDate = startDate.clone().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        }
        else {
            this.startDate = Datetime.from(startDate).setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        }
        if (endDate instanceof Datetime) {
            this.endDate = endDate.clone().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        }
        else {
            this.endDate = Datetime.from(endDate).setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
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
            milliseconds = datetime.clone().setHour(0).setMinute(0).setSecond(0).setMillisecond(0).getAllMilliseconds();
        }
        else {
            milliseconds = Datetime.from(datetime).setHour(0).setMinute(0).setSecond(0).setMillisecond(0).getAllMilliseconds();
        }
        if (this.startDate.getAllMilliseconds() <= milliseconds && milliseconds <= this.endDate.getAllMilliseconds()) {
            return true;
        }
        return false;
    }
    /**
     * @deprecated
     */
    equals(parameter1, endDate) {
        let comparison;
        if (parameter1 instanceof Span) {
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
                comparison = new Span(startDateOfComparison, endDateOfComparison);
            }
        }
        if (comparison) {
            return this.startDate.equalsDate(comparison.startDate) && this.endDate.equals(comparison.endDate);
        }
        return false;
    }
}
