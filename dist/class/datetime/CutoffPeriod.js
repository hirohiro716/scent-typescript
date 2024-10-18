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
    constructor(...cutoffDays) {
        this._baseDate = Datetime.from().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        this.cutoffDays = cutoffDays;
    }
    /**
     * 基準日。現在の時刻がデフォルト。
     */
    get baseDate() {
        return this._baseDate;
    }
    set baseDate(date) {
        let datetime;
        if (date instanceof Date) {
            datetime = new Datetime(date);
        }
        else {
            datetime = date.clone();
        }
        this._baseDate = datetime.setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
    }
    /**
     * 指定された月数分、基準日の前後の期間を作成する。
     *
     * @param numberOfMounths
     * @returns
     */
    createPeriods(numberOfMounths) {
        // Calculate the required cutoff date
        const arrayOfMilliseconds = [];
        for (let monthNumber = 0; monthNumber <= numberOfMounths; monthNumber++) {
            for (let cutoffDayIndex = 0; cutoffDayIndex < this.cutoffDays.length; cutoffDayIndex++) {
                const cutoffDay = this.cutoffDays[cutoffDayIndex];
                const datetime = this._baseDate.clone();
                if (monthNumber < numberOfMounths) {
                    const forward = datetime.clone();
                    forward.addMonth(monthNumber);
                    if (cutoffDay >= 28) {
                        forward.changeToLastDayOfMonth();
                    }
                    else {
                        forward.setDay(cutoffDay);
                    }
                    arrayOfMilliseconds.push(forward.getAllMilliseconds());
                }
                if (monthNumber > 0) {
                    if (monthNumber < numberOfMounths || cutoffDayIndex == this.cutoffDays.length - 1) {
                        const backward = datetime.clone();
                        backward.addMonth(monthNumber * -1);
                        if (cutoffDay >= 28) {
                            backward.changeToLastDayOfMonth();
                        }
                        else {
                            backward.setDay(cutoffDay);
                        }
                        arrayOfMilliseconds.push(backward.getAllMilliseconds());
                    }
                }
            }
        }
        arrayOfMilliseconds.sort();
        // Create periods
        const periods = [];
        for (let index = 0; index < arrayOfMilliseconds.length - 1; index++) {
            const from = new Datetime();
            from.setAllMilliseconds(arrayOfMilliseconds[index]);
            from.addDay(1);
            const to = new Datetime();
            to.setAllMilliseconds(arrayOfMilliseconds[index + 1]);
            to.setHour(23).setMinute(59).setSecond(59).setMillisecond(999);
            periods.push(new Period(from, to));
        }
        return periods;
    }
    /**
     * 指定された日付が含まれる期間を特定する。
     *
     * @param oneDate
     * @returns
     */
    findPeriod(oneDate) {
        const instance = new CutoffPeriod(...this.cutoffDays);
        instance.baseDate = oneDate;
        for (const period of instance.createPeriods(2)) {
            if (period.startDatetime.getAllMilliseconds() <= instance.baseDate.getAllMilliseconds()
                && instance.baseDate.getAllMilliseconds() <= period.endDatetime.getAllMilliseconds()) {
                return period;
            }
        }
        // Unreachable code.
        return new Period(instance.baseDate.clone(), instance.baseDate.clone());
    }
}
