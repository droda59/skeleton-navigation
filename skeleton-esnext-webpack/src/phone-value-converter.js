export class PhoneValueConverter {
    toView(value) {
        if (!value)
            return value;

        let result = value.removeNonDigits();
        let formatted = result;

        if (result.length >= 3) {
            formatted = result.substring(0, 3) + "-";
        }
        
        if (result.length >= 6) {
            formatted += result.substring(3, 6) + "-";
            formatted += result.substring(6);
        } else {
            formatted += result.substring(3);
        }

        return formatted;
    }
}