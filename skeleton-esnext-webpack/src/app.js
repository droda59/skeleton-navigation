export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome/index',      nav: true, title: 'Welcome' },
      { route: "users", name: "users", moduleId: "./users/index", nav: true, title: "Users"},
      { route: "users/:id/detail", name: "user", moduleId: "./users/detail" },
      { route: "users/new/detail", name: "newUser", moduleId: "./users/detail" }
    ]);

    this.router = router;
  }
}
