# roversAIgotchi

A virtual AI pet (Tamagotchi-style) for the **BBC micro:bit**, built with [MakeCode](https://makecode.microbit.org/).  
Take care of your Gotchi by keeping it fed, happy, and well-rested!

---

## Getting Started

1. Open [https://makecode.microbit.org](https://makecode.microbit.org) in your browser.
2. Click **Import** → **Import URL** and paste this repository's URL, **or** copy the contents of `main.ts` into the JavaScript editor.
3. Click **Download** to flash the code onto your micro:bit.

---

## Controls

| Input | Action |
|-------|--------|
| **Button A** | Feed your Gotchi (increases hunger level) |
| **Button B** | Play with your Gotchi (increases happiness, costs energy) |
| **Button A + B** | Display current stats (`H` = hunger, `J` = joy, `E` = energy) |
| **Shake** | Wake your Gotchi up |

---

## Gotchi Stats

| Stat | Range | Description |
|------|-------|-------------|
| Hunger | 0 – 10 | 0 = starving, 10 = full |
| Happiness | 0 – 10 | 0 = sad, 10 = very happy |
| Energy | 0 – 10 | 0 = exhausted, 10 = fully rested |

Stats decrease over time. Keep your Gotchi alive by interacting with it regularly!

---

## LED Faces

- 😊 **Happy** – hunger ≥ 7 and happiness ≥ 7
- 😢 **Sad** – hunger ≤ 2 or happiness ≤ 2
- 😐 **Neutral/Hungry** – everything else
- 💤 **Sleeping** – energy ran out; pet recovers automatically
- ✕  **Dead** – (reserved for future use)

---

## Project Structure

```
pxt.json    — MakeCode project configuration
main.ts     — Starter code (TypeScript)
README.md   — This file
```

---

## Extending the Project

Ideas for students to explore:

- Add a **temperature** check using `input.temperature()` — give the Gotchi a cold!
- Use the **accelerometer** for more gestures (e.g., tilt left/right for mini-games).
- Track a **score** or **age** and display it.
- Add **sound** with `music.playTone()` when the Gotchi is happy or hungry.
- Introduce a **random event** each game loop cycle.

---

## License

See [LICENSE](LICENSE).
