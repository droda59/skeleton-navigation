import {bindable} from "aurelia-framework";

export class PhoneInput {
    @bindable phone = {};
    @bindable delete;

    deletePhoneNumber() {
        this.delete({phone: this.phone});
    }
}