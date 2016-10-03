export class ConfirmationModalController {
	openModal(onApprove) {
		$(".ui.modal").modal({
			onApprove: onApprove
		})
		.modal("show");
	}
}
