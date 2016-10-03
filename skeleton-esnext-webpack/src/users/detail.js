import {HttpClient, json} from "aurelia-fetch-client";
import {inject, Lazy, NewInstance} from "aurelia-framework";
import {Router} from "aurelia-router";
import {ValidationController, ValidationRules} from "aurelia-validation";
import {SemanticFormValidationRenderer} from "semantic-form-validation-renderer";

@inject(Lazy.of(HttpClient), Router, NewInstance.of(ValidationController))
export class User {
    user = {
        phoneNumbers: []
    };

    constructor(getHttpClient, router, controller) {
        this.getHttpClient = getHttpClient;
        this.router = router;
        this.controller = controller;
        this.controller.addRenderer(new SemanticFormValidationRenderer());
    }

    async activate(params) {
        await fetch;

        const http = this.http = this.getHttpClient();

        http.configure(config => {
            config
                .withDefaults({
                    headers: {
                        "Accept": "application/json"
                    }
                })
                .rejectErrorResponses()
                .withBaseUrl("http://handsonapi.azurewebsites.net/");
        });
        
        if (params.id) {
            this.id = params.id;

            await this._getUser();
        }
    }

    deletePhoneNumber(phoneNumber) {
        this.user.phoneNumbers.removeItem(phoneNumber);
    }

    addPhoneNumber() {
        this.user.phoneNumbers.push({});
    }

    cancel() {
        this.router.navigateToRoute("users");
    }

    async save() {
        this.errors = await this.controller.validate();
        if (!this.errors.length) {
            try {
                await this.http.fetch("api/employees/" + this.id, {
                    method: this.id ? "PUT" : "POST",
                    body: json(this.user)
                });

                this.router.navigateToRoute("users")
            } catch (e) {
                this.errors.push({error: { message: e.statusText }});
            }
        }
    }

    async _getUser() {
        let response = await this.http.fetch("api/employees/" + this.id);
        this.user = await response.json();

        ValidationRules
            .ensure(x => x.firstName).required()
            .ensure(x => x.lastName).required()
            .ensure(x => x.email).email()
            .on(this.user);
    }

    get fullName() {
        return `${this.user.firstName} ${this.user.lastName}`;
    }
}