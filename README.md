# HavenKeeper

A scenario bookkeeping app for Gloomhaven and Frosthaven.

https://primalzed.github.io/haven-keeper

## Features
* Add Characters, Monsters, and Monster Standees to your tabletop
* Quick reference for Monster stats for the scenario level
* Track Hit Points and Conditions on each figure
* Track Elemental Infusions
* Draw Monster cards
* Sort by Initiative order
* Undo / Redo
  * Redo for drawing cards will draw the same card
* View Spent / Remaining cards in monster ability deck

### Peer-to-Peer
Found in the ![menu](https://raw.githubusercontent.com/google/material-design-icons/master/src/navigation/menu/materialicons/24px.svg) menu, Peer-to-Peer can be used to share the tabletop among devices in the local network.

The tabletop is saved on the host's device and shared with one or more connected guests.

#### As Host
1. Select 'Host'.
2. Add a Guest connection with ![add](https://raw.githubusercontent.com/google/material-design-icons/master/src/content/add/materialicons/24px.svg).
3. Give the generated offer code to the guest, either by copying and sharing the offer code or by showing them the QR code to scan.
4. Either paste the guest's answer code into the textbox and press ![done](https://raw.githubusercontent.com/google/material-design-icons/master/src/action/done/materialicons/24px.svg) or scan the guest's QR code.
5. Continue adding guests as desired.
6. Remove a connection with ![delete](https://raw.githubusercontent.com/google/material-design-icons/master/src/action/delete/materialicons/24px.svg).

#### As Guest
1. Select 'Guest'.
2. Either paste the host's offer code into the textbox and press ![done](https://raw.githubusercontent.com/google/material-design-icons/master/src/action/done/materialicons/24px.svg) or scan the host's QR code.
4. Give the generated answer code to the host, either by copying and sharing the answer code or by showing them the QR code to scan.

#### Close Peer-to-Peer
Close all connections and leave with ![logout](https://raw.githubusercontent.com/google/material-design-icons/master/src/action/logout/materialicons/24px.svg).

### Install for Offline Use
As a [Progressive Web App](https://developer.mozilla.org/en-US/docs/web/progressive_web_apps), this app can be installed for offline use from the browser in most devices.

## Tech Stack
This runs entirely in-browser, meaning there is no server-side component to it. Even the peer-to-peer works only within the local network.

Key libraries include:
* [Angular]()
* [Angular Material]()
* [NGRX Store, Effects, and Entity]()
* [QRious](https://github.com/neocotic/qrious)
* [ZXing ngrx-scanner](https://github.com/zxing-js/ngx-scanner)

Data persistence uses [IndexDB]()

Peer-to-peer uses [WebRTC]()

Installing for offline use is done as a [Progressive Web App](https://developer.mozilla.org/en-US/docs/web/progressive_web_apps)

## TODO
* Add data for the remaining characters, monsters, and monster ability decks.
* Figure out how to handle displaying AOE targets.
* On-Death Abilities
* Better way to codify "instead" element enhancements
* Track Summons.
* Add Jaws of the Lion and Frosthaven.

### Potential future features
* Internationalization support
* Monster attack modifier deck
* Track character loot and xp
* Character and monster portraits

## Contributing
To report bugs or request features, please submit an [Issue](https://github.com/PrimalZed/haven-keeper/issues).

To help out with code, please submit a [Pull Request](https://github.com/PrimalZed/haven-keeper/pulls).

### Development server

Run `npm run ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `npm run pwa` for a dev server as a Progressive Web App. Navigate to `http://localhost:8080/haven-keeper`.

---

Gloomhaven, Forgotten Circles, Frosthaven, and Jaws of the Lion and all related properties, images and text are owned by Cephalofair Games.
