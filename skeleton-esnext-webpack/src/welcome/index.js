import {inject} from "aurelia-framework";
import {HttpClient, blob} from "aurelia-fetch-client";
import Recorder from "recorderjs";

@inject(HttpClient)
export class Welcome {
    errors = [];
    token = undefined;
    text = "";
    color = "black";
    isWorking = false;
    audioBlob = undefined;
    
    constructor(httpClient) {
        this._http = httpClient;
    }

    async activate() {
        this.isWorking = true;
        let response = await this._http.fetch("https://api.cognitive.microsoft.com/sts/v1.0/issueToken", {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key" : "8a1da83b87ad478e804b775b417bbf35",
                "Accept": "text/plain"
            }
        });

        this.token = await response.text();
        this.isWorking = false;
    }

    attached() {
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }

    async send() {
        if (!this.errors.length) {
            try {
                let requestUri = "https://speech.platform.bing.com/recognize";
                requestUri += "?scenarios=smd";                                  // websearch is the other main option.
                requestUri += "&appid=D4D52672-91D7-4C74-8AD8-42B1D98141A5";     // You must use this ID.
                requestUri += "&locale=fr-FR";                                   // We support several other languages.  Refer to README file.
                requestUri += "&device.os=Android";
                requestUri += "&version=3.0";
                requestUri += "&maxnbest=3";
                requestUri += "&format=json";
                requestUri += "&instanceid=565D69FF-E928-4B7E-87DA-9A750B96D9E3";
                requestUri += "&requestid=" + this._generateUUID();

                this.isWorking = true;
                console.log("Sending data");

                let response = await this._http.fetch(requestUri, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    },
                    body: this.audioBlob
                });

                console.log("Received response from server!");
                this.isWorking = false;

                const results = await response.json();

                if (results.results.length) {
                    this.text = results.results[0].name;
                } else {
                    this.text = "";
                }

                if (this.text.search("bleu") >= 0) {
                    this.color = "blue";
                } else if (this.text.search("rouge") >= 0) {
                    this.color = "red";
                } else if (this.text.search("noir") >= 0) {
                    this.color = "black";
                } else if (this.text.search("blanc") >= 0) {
                    this.color = "white";
                } else if (this.text.search("jaune") >= 0) {
                    this.color = "yellow";
                } else if (this.text.search("orange") >= 0) {
                    this.color = "orange";
                } else if (this.text.search("vert") >= 0) {
                    this.color = "green";
                }

            } catch (e) {
                this.errors = [];
                this.errors.push({error: { message: e.statusText }});
            }
        }
    }

    startRecording() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, s => {
                console.log("Creating audio");

                var context = new AudioContext();
                var mediaStreamSource = context.createMediaStreamSource(s);

                this.recorder = new Recorder(mediaStreamSource);
                this.recorder.record();
            }, e => {
                console.log('Rejected!', e);
                this.errors.push({error: { message: e }});
            });
        } else {
            console.log('navigator.getUserMedia not present');
        }
    }

    stopRecording() {
        console.log("Stopping audio");
        var audio = document.querySelector('audio');

        this.recorder.stop();
        this.recorder.exportWAV(s => {
            this.audioBlob = s;
            console.log("Exporting audio");
            audio.src = window.URL.createObjectURL(s);
        });
    }

    _generateUUID() {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }

        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });

        return uuid;
    }
}
