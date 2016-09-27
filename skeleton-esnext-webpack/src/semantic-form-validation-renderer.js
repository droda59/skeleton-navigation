export class SemanticFormValidationRenderer {
    render(instruction) {
        for (let {error, elements} of instruction.unrender) {
            elements.forEach(target => {
                const field = target.querySelector(".field") || target.closest(".field");
                field.classList.remove("error");
            });
        }

        for (let {error, elements} of instruction.render) {
            elements.forEach(target => {
                const field = target.querySelector(".field") || target.closest(".field");
                field.classList.add("error");
            });
        }
    }
}
