export default class Currency {
    constructor(code, name) {
        this._code = code;
        this._name = name;
    }

    get code() {
            return this._code;
        }

    set code(newCode) {
        return this._code;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        return this._name;
    }

    displayFullCurrency() {
        return `${this._name} (${this._code})`;
    }
}
