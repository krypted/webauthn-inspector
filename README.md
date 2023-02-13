# webauthn-inspector

WebAuthn uses the navigator.credentials.create and navigator.credentials.get endpoints to create an id and challenge that's used to obtain derived credentials. This project lists json from the navigator.credentials.create and navigator.credentials.get endpoints in a modal:

<img src="image/1.png" width=600 alt="hi" class="inline"/>

Then lists the json returned in the modal:

<img src="image/2.png" width=600 alt="hi" class="inline"/>

## Installation
This is just a PoC so meant to be loaded as an unpacked Chrome extension for now.

<img src="image/extensionloader.png" width=400 alt="hi" class="inline"/>

## What's Next
Working on adding functionality to inject custom json into the process.
