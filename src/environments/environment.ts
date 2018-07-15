// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//Configuracion de Firebase
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC6M_JahTY3CrxgVix-SzH0Nl5FWXzNAQQ',
    authDomain: 'heroesapp-2e2ec.firebaseapp.com',
    databaseURL: 'https://heroesapp-2e2ec.firebaseio.com',
    projectId: 'heroesapp-2e2ec',
    storageBucket: 'heroesapp-2e2ec.appspot.com',
    messagingSenderId: '560584260485'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
 //import 'zone.js/dist/zone-error';  // Included with Angular CLI.
