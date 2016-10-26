export class App {
  configureRouter(config, router) {
    config.title = 'Bing Speech API';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome/index',      nav: true, title: 'Welcome' }
    ]);

    this.router = router;
  }
}
