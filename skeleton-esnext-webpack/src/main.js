// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.css';
import '../semantic/dist/semantic.min.css';
import '../semantic/dist/semantic.min.js';
import {HttpClient} from "aurelia-fetch-client";

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // .developmentLogging()
    .plugin("aurelia-validation");

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

    let httpService = new HttpClient();
    httpService.configure(config => {
        config
            .withDefaults()
            .rejectErrorResponses();
    });

    aurelia.container.registerInstance(HttpClient, httpService);

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */

    String.prototype.removeNonDigits = function() {
        let digits = "";

        for (let i = 0; i < this.length; i++) {
            let char = this.charAt(i);

            if ("0" <= char && char <= "9")
                digits += char;
        }

        return digits;
    }
    
    Array.prototype.removeItem = function(item) {
        var i = this.indexOf(item);
        if(i != -1) {
            this.splice(i, 1);
        }
    }
}