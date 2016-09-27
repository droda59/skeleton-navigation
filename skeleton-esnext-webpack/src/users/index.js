import {HttpClient} from "aurelia-fetch-client";
import {inject, Lazy} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Lazy.of(HttpClient), Router)
export class Users {
    users = [];

    constructor(getHttpClient, router) {
        this.getHttpClient = getHttpClient;
        this.router = router;
    }

    async activate() {
        await fetch;

        const http = this.http = this.getHttpClient();

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("http://handsonapi.azurewebsites.net/");
        });

        await this._getUsers();
    }

    deleteUser(id) {
        let that = this;

        $(".ui.modal").modal({
            onApprove: async () =>
            { 
                await that.http.fetch("api/employees/" + id, {
                    method: "delete"
                });
                
                await that._getUsers();
            }
        })
        .modal("show");
    }

    addUser() {
        this.router.navigateToRoute("newUser");
    }

    editUser(id) {
        this.router.navigateToRoute("user", { id: id });
    }

    async _getUsers() {
        let response = await this.http.fetch("api/employees");
        this.users = await response.json();
    }
}