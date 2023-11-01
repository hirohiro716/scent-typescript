import StringObject from "../StringObject.js";
/**
 * 日時のクラス。
 */
export class Datetime {
    /**
     * @deprecated
     */
    constructor(parameter1, month, day, hour, minute, second) {
        /**
         * 年〜日までの区切り文字。
         */
        this.yearToDateSeparator = "-";
        if (typeof parameter1 === "string") {
            this._date = new Date();
            const millisecond = Date.parse(parameter1);
            if (isNaN(millisecond) === false) {
                this._date.setTime(millisecond);
            }
            else {
                this._date.setTime(0);
                const valueLikeDatetime = parameter1.replaceAll("/", "-").replaceAll(" ", "T");
                const millisecond = Date.parse(valueLikeDatetime);
                if (isNaN(millisecond) === false) {
                    this._date.setTime(millisecond);
                }
            }
            return;
        }
        if (typeof parameter1 === "number") {
            this._date = new Date();
            this._date.setTime(0);
            this._date.setFullYear(parameter1);
            if (month)
                this._date.setMonth(month - 1);
            if (day)
                this._date.setDate(day);
            if (hour)
                this._date.setHours(hour);
            if (minute)
                this._date.setMinutes(minute);
            if (second)
                this._date.setSeconds(second);
            return;
        }
        if (parameter1 instanceof Date) {
            this._date = parameter1;
            return;
        }
        this._date = new Date();
    }
    /**
     * 内部で保持しているDateオブジェクトを取得する。
     *
     * @returns
     */
    get date() {
        return this._date;
    }
    /**
     * 年(西暦)を取得する。
     *
     * @returns
     */
    getYear() {
        return this._date.getFullYear();
    }
    /**
     * 月(1〜12)を取得する。
     *
     * @returns
     */
    getMonth() {
        return this._date.getMonth() + 1;
    }
    /**
     * 日(1〜31)を取得する。
     *
     * @returns
     */
    getDay() {
        return this._date.getDate();
    }
    /**
     * 曜日を取得する。
     *
     * @returns
     */
    getDayOfWeek() {
        switch (this._date.getDay()) {
            case 0:
                break;
            case 1:
                return DayOfWeek.MONDAY;
            case 2:
                return DayOfWeek.TUESDAY;
            case 3:
                return DayOfWeek.WEDNESDAY;
            case 4:
                return DayOfWeek.THURSDAY;
            case 5:
                return DayOfWeek.FRIDAY;
            case 6:
                return DayOfWeek.SATURDAY;
        }
        return DayOfWeek.SUNDAY;
    }
    /**
     * 時(0〜23)を取得する。
     *
     * @returns
     */
    getHour() {
        return this._date.getHours();
    }
    /**
     * 分(0〜59)を取得する。
     *
     * @returns
     */
    getMinute() {
        return this._date.getMinutes();
    }
    /**
     * 秒(0〜59)を取得する。
     *
     * @returns
     */
    getSecond() {
        return this._date.getSeconds();
    }
    /**
     * ミリ秒(0〜999)を取得する。
     *
     * @returns
     */
    getMillisecond() {
        return this._date.getMilliseconds();
    }
    /**
     * 0ミリ秒が表す日時(1970-01-01 00:00:00.000)からの経過ミリ秒を取得する。
     *
     * @returns
     */
    getAllMilliseconds() {
        return this._date.getTime();
    }
    /**
     * 年(西暦)をセットする。
     *
     * @param year
     * @returns このインスタンス。
     */
    setYear(year) {
        this._date.setFullYear(year);
        return this;
    }
    /**
     * 月(1〜12)をセットする。
     *
     * @param month
     * @returns このインスタンス。
     */
    setMonth(month) {
        this._date.setMonth(month - 1);
        return this;
    }
    /**
     * 日(1〜31)をセットする。
     *
     * @param day
     * @returns このインスタンス。
     */
    setDay(day) {
        this._date.setDate(day);
        return this;
    }
    /**
     * 時(0〜23)をセットする。
     *
     * @param hour
     * @returns このインスタンス。
     */
    setHour(hour) {
        this._date.setHours(hour);
        return this;
    }
    /**
     * 分(0〜59)をセットする。
     *
     * @param minute
     * @returns このインスタンス。
     */
    setMinute(minute) {
        this._date.setMinutes(minute);
        return this;
    }
    /**
     * 秒(0〜59)をセットする。
     *
     * @param minute
     * @returns このインスタンス。
     */
    setSecond(second) {
        this._date.setSeconds(second);
        return this;
    }
    /**
     * ミリ秒(0〜999)をセットする。
     *
     * @param minute
     * @returns このインスタンス。
     */
    setMillisecond(millisecond) {
        this._date.setMilliseconds(millisecond);
        return this;
    }
    /**
     * 0ミリ秒が表す日時(1970-01-01 00:00:00.000)からの経過ミリ秒をセットする。
     *
     * @param milliseconds
     * @returns このインスタンス。
     */
    setAllMilliseconds(milliseconds) {
        this._date.setTime(milliseconds);
        return this;
    }
    /**
     * 年を加算する。
     *
     * @param year
     * @returns このインスタンス。
     */
    addYear(year) {
        return this.setYear(this.getYear() + year);
    }
    /**
     * 月を加算する。
     *
     * @param month
     * @returns このインスタンス。
     */
    addMonth(month) {
        return this.setMonth(this.getMonth() + month);
    }
    /**
     * 日を加算する。
     *
     * @param day
     * @returns このインスタンス。
     */
    addDay(day) {
        return this.setDay(this.getDay() + day);
    }
    /**
     * 時を加算する。
     *
     * @param hour
     * @returns このインスタンス。
     */
    addHour(hour) {
        return this.setHour(this.getHour() + hour);
    }
    /**
     * 分を加算する。
     *
     * @param minute
     * @returns このインスタンス。
     */
    addMinute(minute) {
        return this.setMinute(this.getMinute() + minute);
    }
    /**
     * 秒を加算する。
     *
     * @param second
     * @returns このインスタンス。
     */
    addSecond(second) {
        return this.setSecond(this.getSecond() + second);
    }
    /**
     * ミリ秒を加算する。
     *
     * @param millisecond
     * @returns このインスタンス。
     */
    addMillisecond(millisecond) {
        return this.setMillisecond(this.getMillisecond() + millisecond);
    }
    /**
     * 月末に変更する。
     */
    changeToLastDayOfMonth() {
        this.addMonth(1);
        this.setDay(1);
        this.addDay(-1);
    }
    /**
     * 文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toString() returns "2023-12-22 12:12:00"
     *
     * @param datetimeFormat 日時文字列フォーマットパターン。デフォルトはDatetimeFormat.DATE_TO_SECOND。
     * @returns
     */
    toString(datetimeFormat = DatetimeFormat.DATE_TO_SECOND) {
        const value = new StringObject();
        switch (datetimeFormat) {
            case DatetimeFormat.DATE_ONLY:
            case DatetimeFormat.DATE_TO_MINUTE:
            case DatetimeFormat.DATE_TO_SECOND:
                value.append(this._date.getFullYear());
                value.append(this.yearToDateSeparator);
                value.append(StringObject.from(this._date.getMonth() + 1).paddingLeft(2, "0"));
                value.append(this.yearToDateSeparator);
                value.append(StringObject.from(this._date.getDate()).paddingLeft(2, "0"));
        }
        switch (datetimeFormat) {
            case DatetimeFormat.DATE_TO_MINUTE:
            case DatetimeFormat.DATE_TO_SECOND:
            case DatetimeFormat.HOUR_TO_MINUTE:
            case DatetimeFormat.HOUR_TO_SECOND:
                if (value.length() > 0) {
                    value.append(" ");
                }
                value.append(StringObject.from(this._date.getHours()).paddingLeft(2, "0"));
                value.append(":");
                value.append(StringObject.from(this._date.getMinutes()).paddingLeft(2, "0"));
        }
        switch (datetimeFormat) {
            case DatetimeFormat.DATE_TO_SECOND:
            case DatetimeFormat.HOUR_TO_SECOND:
                value.append(":");
                value.append(StringObject.from(this._date.getSeconds()).paddingLeft(2, "0"));
        }
        return value.toString();
    }
    /**
     * 日付のみの文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toStringOnlyDate() returns "2023-12-22"
     *
     * @returns
     */
    toStringOnlyDate() {
        return this.toString(DatetimeFormat.DATE_ONLY);
    }
    /**
     * 時刻のみの文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toStringOnlyTime() returns "12:12:00"
     *
     * @returns
     */
    toStringOnlyTime() {
        return this.toString(DatetimeFormat.HOUR_TO_SECOND);
    }
    /**
     * このオブジェクトのクローンを作成する。
     *
     * @returns
     */
    clone() {
        let datetime = new Datetime(new Date(this._date));
        return datetime;
    }
    /**
     * 指定された変数が表す時刻がミリ秒まで同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equals(comparison) {
        if (typeof comparison === "string") {
            const datetimeForComparison = new Datetime(comparison);
            if (this._date.getTime() === datetimeForComparison._date.getTime()) {
                return true;
            }
        }
        if (comparison instanceof Datetime) {
            if (this._date.getTime() === comparison._date.getTime()) {
                return true;
            }
        }
        if (comparison instanceof Date) {
            if (this._date.getTime() === comparison.getTime()) {
                return true;
            }
        }
        return false;
    }
    /**
     * 指定された変数が表す日付の年/月/日が同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equalsDate(comparison) {
        let datetimeForComparison;
        if (typeof comparison === "string") {
            datetimeForComparison = new Datetime(comparison);
        }
        else if (comparison instanceof Date) {
            datetimeForComparison = new Datetime(comparison);
        }
        else if (comparison instanceof Datetime) {
            datetimeForComparison = comparison;
        }
        else {
            return false;
        }
        return this.getYear() === datetimeForComparison.getYear() && this.getMonth() === datetimeForComparison.getMonth() && this.getDay() === datetimeForComparison.getDay();
    }
    /**
     * 指定された変数が表す時刻の時/分/秒/ミリ秒が同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equalsTime(comparison) {
        let datetimeForComparison;
        if (typeof comparison === "string") {
            datetimeForComparison = new Datetime(comparison);
        }
        else if (comparison instanceof Date) {
            datetimeForComparison = new Datetime(comparison);
        }
        else if (comparison instanceof Datetime) {
            datetimeForComparison = comparison;
        }
        else {
            return false;
        }
        return this.getHour() === datetimeForComparison.getHour() && this.getMinute() === datetimeForComparison.getMinute()
            && this.getSecond() === datetimeForComparison.getSecond() && this.getMillisecond() === datetimeForComparison.getMillisecond();
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param dateValue
     * @returns
     */
    static from(dateValue) {
        if (dateValue instanceof Date) {
            return new Datetime(dateValue);
        }
        else if (typeof dateValue === "string") {
            return new Datetime(dateValue);
        }
        else {
            return new Datetime();
        }
    }
}
/**
 * 曜日の定数。
 */
export var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["SUNDAY"] = "sunday";
    DayOfWeek["MONDAY"] = "monday";
    DayOfWeek["TUESDAY"] = "tuesday";
    DayOfWeek["WEDNESDAY"] = "wednesday";
    DayOfWeek["THURSDAY"] = "thursday";
    DayOfWeek["FRIDAY"] = "friday";
    DayOfWeek["SATURDAY"] = "saturday";
})(DayOfWeek || (DayOfWeek = {}));
/**
 * 日時文字列フォーマットパターンの定数。
 */
export var DatetimeFormat;
(function (DatetimeFormat) {
    DatetimeFormat["DATE_ONLY"] = "date_only";
    DatetimeFormat["DATE_TO_MINUTE"] = "date_to_minute";
    DatetimeFormat["DATE_TO_SECOND"] = "date_to_second";
    DatetimeFormat["HOUR_TO_SECOND"] = "hour_to_second";
    DatetimeFormat["HOUR_TO_MINUTE"] = "hour_to_minute";
})(DatetimeFormat || (DatetimeFormat = {}));
