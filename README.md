# MyContacts

This is a sample APP to simplify authentication flow and getting started with SoftRig & Angular.

Please add the clientID of you app in the environment file, 
and you are ready to go. 

PS! Make sure that you have the correct redirect url's set in the developer portal: 
https://developer.softrig.com/manage-apps/apps

## Troubleshooter
If you encounter error messages on sign in, you 
can view a complete list in the diagnostics for your app: https://developer.softrig.com/manage-apps/diagnostics

Here's a wiki doc on general troubleshooting: https://developer.softrig.com/wiki/how-to/troubleshooting

Using the angular-auth-oidc-client lib https://www.npmjs.com/package/angular-auth-oidc-client

```
export const environment = {
    production: false,
    SIGNALR_PUSHHUB_URL: 'https://test-signal.softrig.com/pushHub',
    base_url: 'https://test.softrig.com/api',
    authority: 'https://test-login.softrig.com',
    client_id: '',
    redirect_uri: 'http://localhost:4200',
    post_logout_redirect_uri: 'http://localhost:4200',
    silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
    automaticSilentRenew: true,
    response_type: 'code',
    scope: 'openid profile AppFramework',
    loadUserInfo: false,
    filterProtocolClaims: true, // prevents protocol level claims such as nbf, iss, at_hash, and nonce from being extracted from the identity token as profile dataloadUserInfo: true
  };
```

You will find the SoftRig Swagger for Contacts entity here: https://developer.softrig.com/api-docs/contact

Wiki docs on how to use the Contacts API with expand, here: https://developer.softrig.com/wiki/how-to/contacts



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
