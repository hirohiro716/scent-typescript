import { Datetime } from "./Datetime.js";
import Period from "./Period.js";

/**
 * 締め日期間のクラス。
 */
export default class CutoffPeriod {

    /**
     * コンストラクタ。締める日を指定する。
     * 
     * @param cutoffDays 
     */
    public constructor(...cutoffDays: number[]) {
        this.cutoffDays = cutoffDays;
    }

    /**
     * 締める日。
     */
    public readonly cutoffDays: number[];

    private _baseDate: Datetime = Datetime.from().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);

    /**
     * 基準日。デフォルトは現在の時刻。
     */
    public get baseDate(): Datetime {
        return this._baseDate;
    }

    public set baseDate(date: Date | Datetime) {
        let datetime: Datetime;
        if (date instanceof Date) {
            datetime = new Datetime(date);
        } else {
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
    public createPeriods(numberOfMounths: number): Period[] {
        // Calculate the required cutoff date
        const arrayOfMilliseconds: number[] = [];
        for (let monthNumber = 0; monthNumber <= numberOfMounths; monthNumber++) {
            for (let cutoffDayIndex = 0; cutoffDayIndex < this.cutoffDays.length; cutoffDayIndex++) {
                const cutoffDay = this.cutoffDays[cutoffDayIndex];
                const datetime = this.baseDate.clone();
                if (monthNumber < numberOfMounths) {
                    const forward = datetime.clone();
                    forward.addMonth(monthNumber);
                    if (cutoffDay >= 28) {
                        forward.changeToLastDayOfMonth();
                    } else {
                        forward.setDay(cutoffDay);
                    }
                    arrayOfMilliseconds.push(forward.getAllMilliseconds());
                }
                if (monthNumber > 0) {
                    if (monthNumber < numberOfMounths || cutoffDayIndex == this.cutoffDays.length -1) {
                        const backward = datetime.clone();
                        backward.addMonth(monthNumber * -1);
                        if (cutoffDay >= 28) {
                            backward.changeToLastDayOfMonth();
                        } else {
                            backward.setDay(cutoffDay);
                        }
                        arrayOfMilliseconds.push(backward.getAllMilliseconds());
                    }
                }
            }
        }
        arrayOfMilliseconds.sort();
        // Create periods
        const periods: Period[] = [];
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
    public findPeriod(oneDate: Datetime | Date): Period {
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
