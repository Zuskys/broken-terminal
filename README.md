# BrokenTerminal

A minigame inspired by the terminal hacking mechanic from Fallout 3/New Vegas, built with vanilla JavaScript, HTML, and CSS.

## Demo

[Live demo](https://zuskys.github.io/broken-terminal/)

## Gameplay

You're presented with a list of words. One of them is the correct password. You have **4 attempts** to find it.

After each wrong guess, you get a **resemblance score**.The number of letters that match the correct word in the same position. Use that information to narrow down the password before you run out of attempts.

The game has **progressive difficulty**: as you complete rounds, the words get longer and harder to crack.

| Rounds | Word Length |
| ------ | ----------- |
| 1 – 3  | 5 letters   |
| 4 – 6  | 6 letters   |
| 7 – 8  | 7 letters   |
| 9 – 10 | 10 letters  |

## Features

- Progressive difficulty across 10 rounds
- Likeness feedback system to help you deduce the correct word
- Attempt history panel showing every guess and its score
- Visual attempt indicators

## Project Structure

```
├── index.html
├── styles.css
├── src/
│   ├── main.js          # DOM logic, rendering, event handling
│   ├── game.js          # Game logic, state, round management
│   └── utils.js         # Helper functions
└── assets/
    └── wordsByLength.json
```

## Built With

- Vanilla JavaScript (ES Modules)
- HTML & CSS (Grid, Custom Properties)
- [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) — Google Fonts
- Words sourced from [dwyl/english-words](https://github.com/dwyl/english-words), filtered by length using a custom Python script.
