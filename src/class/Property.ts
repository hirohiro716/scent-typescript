import Enumeration from "./Enumeration.js";

/**
 * プロパティのクラス。
 */
export default class Property extends Enumeration {

    /**
     * コンストラクタ。
     * 
     * @param physicalName プロパティの物理名。
     * @param logicalName プロパティの論理名。
     * @param defaultValue プロパティの初期値。
     * @param maximumLength プロパティに入力できる最大文字数。負数は制限がないことを表す。
     */
    public constructor(physicalName: string, logicalName: string, defaultValue?: any, maximumLength: number = -1) {
        super(physicalName, logicalName);
        this.defaultValue = defaultValue;
        this.maximumLength = maximumLength;
    }

    /**
     * このプロパティの初期値。
     */
    public readonly defaultValue: any;

    /**
     * このプロパティの最大文字数。負数は制限がないことを表す。
     */
    public readonly maximumLength: number;

    /**
     * 指定された定数オブジェクト内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     * 
     * @param properties 
     * @param physicalName 
     * @returns 
     */
    public static findProperty<T extends Property>(properties: Record<any, T | ((...args: any) => any)>, physicalName: string): T | null {
        return Enumeration.findEnumeration(properties, physicalName);
    }

    /**
     * 指定された定数オブジェクト内の定数のみを抽出する。
     * 
     * @param properties 
     * @returns 
     */
    public static extractProperties<T extends Property>(properties: Record<any, T | ((...args: any) => any)>): T[] {
        return Enumeration.extractEnumerations(properties);
    }

    /**
     * 指定された定数オブジェクト内の定数で、物理名がキー、論理名が値のマップを作成する。
     * 
     * @param properties 
     * @returns 
     */
    public static createPropertyNameMap<T extends Property>(properties: Record<any, T | ((...args: any) => any)>): Map<string, string> {
        return Enumeration.createEnumerationNameMap(properties);
    }
}
