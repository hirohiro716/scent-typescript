import StringObject from "../StringObject.js";
import { API } from "../io/API.js";
/**
 * 郵便番号のクラス。
 */
class Zipcode {
    /**
     * 都道府県を取得する。
     */
    static getPrefectures() {
        return Object.values(Zipcode.jisAndPrefectures);
    }
    /**
     * 指定された郵便番号に対する住所を取得する。
     *
     * @param zipcode
     * @returns
     */
    static async fetchAddress(zipcode) {
        const formattedZipcode = new StringObject(zipcode);
        formattedZipcode.replace("[^0-9]", "");
        if (formattedZipcode.length() !== 7) {
            throw new Error("The ZIP code is invalid.");
        }
        const url = new StringObject("https://yubinbango.github.io/yubinbango-data/data/");
        url.append(formattedZipcode.clone().extract(0, 3));
        url.append(".js");
        const api = new API(url.toString(), "GET");
        const response = await api.request();
        const definition = await response.text();
        const json = StringObject.from(definition).replace("\\$yubin\\(", "").replace("\\);", "").toString();
        const data = JSON.parse(json);
        if (typeof data[formattedZipcode.toString()] === "undefined") {
            throw new Error("No address matches this ZIP code.");
        }
        const values = data[formattedZipcode.toString()];
        const prefecture = new StringObject(Zipcode.jisAndPrefectures[values[0]]);
        const address = StringObject.join([values[1], values[2]]);
        return { prefecture: prefecture.toString(), address: address.toString() };
    }
}
/**
 * JISと都道府県のオブジェクト。
 */
Zipcode.jisAndPrefectures = {
    1: "北海道",
    2: "青森県",
    3: "岩手県",
    4: "宮城県",
    5: "秋田県",
    6: "山形県",
    7: "福島県",
    8: "茨城県",
    9: "栃木県",
    10: "群馬県",
    11: "埼玉県",
    12: "千葉県",
    13: "東京都",
    14: "神奈川県",
    15: "新潟県",
    16: "富山県",
    17: "石川県",
    18: "福井県",
    19: "山梨県",
    20: "長野県",
    21: "岐阜県",
    22: "静岡県",
    23: "愛知県",
    24: "三重県",
    25: "滋賀県",
    26: "京都府",
    27: "大阪府",
    28: "兵庫県",
    29: "奈良県",
    30: "和歌山県",
    31: "鳥取県",
    32: "島根県",
    33: "岡山県",
    34: "広島県",
    35: "山口県",
    36: "徳島県",
    37: "香川県",
    38: "愛媛県",
    39: "高知県",
    40: "福岡県",
    41: "佐賀県",
    42: "長崎県",
    43: "熊本県",
    44: "大分県",
    45: "宮崎県",
    46: "鹿児島県",
    47: "沖縄県",
};
export default Zipcode;
