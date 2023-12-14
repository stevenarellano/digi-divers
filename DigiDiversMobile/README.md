# DigiDiversMobile

## Run Locally

1. git clone
2. `yarn`
3. `yarn run android`

## Troubleshooting

### Watchman crawl failed. Retrying once with node crawler. Usually this happens when watchman isn't running. Create an empty .watchmanconfig file in your project's root folder or initialize a git or hg repository in your project.

To fix this error, run:

1. `watchman watch-del-all`
2. `watchman shutdown-server`

### Error: While trying to resolve module `@solana-mobile/wallet-adapter-mobile` from file...

To fix this error, run:

1. `cd js`
2. `yarn run clean`
3. `yarn run build`

### Could not get BatchedBridge, make sure your bundle is packaged correctly

1. Check to make sure your packages have no missing dependencies.

### Starting a Gradle Daemon, 1 busy and 1 incompatible and 2 stopped Daemons could not be reused, use --status for details

1. Restart the Gradle daemon by running the following command in the root directory of your project: `./gradlew --stop && ./gradlew clean build`.
2. Use the --status option to get more details about the status of the daemons. You can run the following command to get more information: ./gradlew --status.

### Axios error: Network Error

1. replace `localhost` with `10.0.2.2`

### Duplicate atom key...

1. add the following to `/App.tsx`: `RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;`

### Sometimes you have to link together pods to the react native?

1. run the following `cd ios && pod install && cd ..`


note:

- this app only works on android emulators
- ensure that you do not have react native installed globally: `yarn global remove react-native-cli`
