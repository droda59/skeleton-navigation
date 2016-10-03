import {HttpClient} from "aurelia-fetch-client";
import {inject, Lazy} from "aurelia-framework";
import {Router} from "aurelia-router";
import {ConfirmationModalController} from "confirmation-modal-controller";

@inject(Lazy.of(HttpClient), Router, ConfirmationModalController)
export class Users {
    users = [];

    constructor(getHttpClient, router, modalController) {
        this.getHttpClient = getHttpClient;
        this.router = router;
        this.modalController = modalController;
    }

    async activate() {
        await fetch;

        const http = this.http = this.getHttpClient();

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("http://handsonapi.azurewebsites.net/");
        });

        let response = await this.http.fetch("api/employees");
        this.users = await response.json();
    }

    deleteUser(user) {
        this.modalController.openModal(async () =>
        { 
            await this.http.fetch("api/employees/" + user._id, {
                method: "delete"
            });

            this.users.removeItem(user);
        });
    }

    addUser() {
        this.router.navigateToRoute("newUser");
    }

    editUser(user) {
        this.router.navigateToRoute("user", {id: user._id});
    }
}