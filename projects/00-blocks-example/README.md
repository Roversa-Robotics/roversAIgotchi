---
title: Blocks Example
parent: Projects
nav_order: 1
permalink: /projects/00-blocks-example/
---

# 00 — Blocks Example

The same PetBot as the extension version, but rebuilt entirely out of standard MakeCode blocks. Open it in MakeCode and click "Blocks" to see how every behavior is assembled — the wellbeing system, the face, the idle loop, and all the activities.

Use it to invent your own behaviors: copy a function, swap the icons, sounds, and robot moves, then wire it to a button.

## Try It

Press **Edit** to open in MakeCode, or **Run** to try it in the simulator right here:

<div style="position:relative;height:0;padding-bottom:70%;overflow:hidden;max-width:100%;margin:1em 0;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    src="https://makecode.microbit.org/---codeembed#pub:S76624-07677-14393-69984"
    allowfullscreen="allowfullscreen" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
</div>

**[Open in MakeCode](https://makecode.microbit.org/S76624-07677-14393-69984)**

## What the Code Does

**Wellbeing system:** The pet has a `wellbeing` score (0–100) that starts at 50. It slowly drops by 1 every 2 seconds in the idle loop. Each activity changes it — some boost wellbeing, others drain it.

**The face:** The idle loop picks an icon based on the current wellbeing:

| Wellbeing | Face |
|-----------|------|
| 75–100 | Fabulous |
| 50–74 | Slight smile |
| 20–49 | Sad |
| 0–19 | Angry |
| Sleeping | Asleep |

**Button map:**

| Input | Button | Function | Wellbeing Effect |
|-------|--------|----------|-----------------|
| Forward (P13) | ⬆️ | `goRun()` — hearts, chase music, random driving | +10 |
| Reverse (P14) | ⬇️ | `goSleep()` — lullaby, asleep face | +20 |
| Right turn (P15) | ↪️ | `textFriend()` — says hello, little dance, heart | +15 |
| Stop (P9) | ⏹️ | `scrollSocialMedia()` — flashing text, noisy | -15 |
| Left turn (P16) | ↩️ | `playGame()` — dodge the wall, A/B to move | +1 per wave, -10 on game over |
| Play (P8) | ▶️ | `seekFriend()` — radio hello to nearby pets | +5 |
| Menu (P5) | ⚪ | `showStats()` — shows wellbeing as a number | — |
| Screen face-down | — | Wake up animation | — |
| Radio received | — | Giggle + react to a friend's hello | +20 |

## Code

```blocks
function showStats () {
    busy = true
    basic.showNumber(wellbeing)
    basic.pause(3000)
    basic.clearScreen()
    busy = false
}
function goRun () {
    busy = true
    for (let index = 0; index < 2; index++) {
        basic.showIcon(IconNames.Heart)
        basic.pause(500)
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(500)
    }
    music.play(music.builtInPlayableMelody(Melodies.Chase), music.PlaybackMode.InBackground)
    for (let index = 0; index < 4; index++) {
        roversa.driveForwards(randint(500, 1500))
        if (Math.randomBoolean()) {
            roversa.right()
        } else {
            roversa.left()
        }
    }
    music.stopAllSounds()
    changeWellbeing(10)
    busy = false
}
function scrollSocialMedia () {
    busy = true
    texts = [
    "Like!",
    "50% OFF",
    "Follow!",
    "Share!",
    "LOL",
    "OMG",
    "VIRAL!"
    ]
    for (let index = 0; index < 2; index++) {
        music.play(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.UntilDone)
        basic.showString("" + (texts[randint(0, texts.length - 1)]))
    }
    basic.clearScreen()
    changeWellbeing(-15)
    busy = false
}
input.onButtonPressed(Button.A, function () {
    if (gameRunning && birdX > 0) {
        birdX += -1
    }
})
roversa.onEvent(RoversaPin.P16, RoversaEvent.Click, function () {
    playGame()
})
roversa.onEvent(RoversaPin.P9, RoversaEvent.Click, function () {
    scrollSocialMedia()
})
function changeWellbeing (amount: number) {
    wellbeing = Math.constrain(wellbeing + amount, 0, 100)
}
function goSleep (sleeping: boolean) {
    busy = true
    for (let index = 0; index < 2; index++) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . . . . .
            `)
        basic.pause(400)
        basic.showIcon(IconNames.Asleep)
        basic.pause(400)
    }
    music.play(music.builtInPlayableMelody(Melodies.Blues), music.PlaybackMode.InBackground)
    changeWellbeing(20)
    basic.showIcon(IconNames.Asleep)
    basic.pause(5000)
    busy = false
}
function seekFriend () {
    busy = true
    for (let index = 0; index < 3; index++) {
        basic.showIcon(IconNames.Heart)
        basic.pause(300)
        basic.showIcon(IconNames.QuarterNote)
        basic.pause(300)
    }
    radio.sendString("hey!")
    basic.showIcon(IconNames.Target)
    basic.pause(1000)
    basic.clearScreen()
    changeWellbeing(5)
    busy = false
}
roversa.onEvent(RoversaPin.P13, RoversaEvent.Click, function () {
    goRun()
})
function playGame () {
    busy = true
    gameRunning = true
    birdX = 2
    obstacleY = 4
    gapX = randint(0, 4)
    while (gameRunning) {
        basic.clearScreen()
        led.plot(birdX, 0)
        for (let x = 0; x <= 4; x++) {
            if (x != gapX) {
                led.plot(x, obstacleY)
            }
        }
        basic.pause(700)
        obstacleY += -1
        if (obstacleY == 0) {
            if (birdX != gapX) {
                gameRunning = false
                basic.clearScreen()
                basic.showString("GAME OVER")
                changeWellbeing(-10)
            } else {
                changeWellbeing(1)
                obstacleY = 4
                gapX = randint(0, 4)
            }
        }
    }
    basic.clearScreen()
    busy = false
}
function textFriend () {
    busy = true
    basic.showString("Hello!")
    roversa.turnRight(45)
    roversa.backward()
    roversa.turnLeft(45)
    basic.showString(". . .")
    music.play(music.builtInPlayableMelody(Melodies.Ringtone), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Heart)
    basic.pause(2000)
    music.stopAllSounds()
    changeWellbeing(15)
    busy = false
}
input.onGesture(Gesture.ScreenDown, function () {
    for (let index = 0; index < 2; index++) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . . . . .
            `)
        basic.pause(400)
        basic.showIcon(IconNames.Asleep)
        basic.pause(400)
    }
    sleeping = false
})
radio.onReceivedString(function (receivedString) {
    if (!(busy)) {
        busy = true
        music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
        basic.showIcon(IconNames.Rabbit)
        changeWellbeing(20)
        basic.pause(2000)
        basic.clearScreen()
        busy = false
    }
})
input.onButtonPressed(Button.B, function () {
    if (gameRunning && birdX < 4) {
        birdX += 1
    }
})
roversa.onEvent(RoversaPin.P14, RoversaEvent.Click, function () {
    sleeping = true
    goSleep(sleeping)
})
roversa.onEvent(RoversaPin.P8, RoversaEvent.Click, function () {
    if (gameRunning == false) {
        seekFriend()
    }
})
roversa.onEvent(RoversaPin.P5, RoversaEvent.Click, function () {
    showStats()
})
roversa.onEvent(RoversaPin.P15, RoversaEvent.Click, function () {
    textFriend()
})
function showFace () {
    if (sleeping) {
        basic.showIcon(IconNames.Asleep)
    } else {
        if (wellbeing < 20) {
            basic.showIcon(IconNames.Angry)
        } else if (wellbeing < 50) {
            basic.showIcon(IconNames.Sad)
        } else if (wellbeing < 75) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . . . . #
                . # # # .
                `)
        } else {
            basic.showIcon(IconNames.Fabulous)
        }
    }
}
let sleeping = false
let gapX = 0
let gameRunning = false
let texts: string[] = []
let busy = false
let obstacleY = 0
let birdX = 0
let wellbeing = 0
wellbeing = 50
birdX = 2
obstacleY = 4
radio.setGroup(1)
wellbeing = 50
showFace()
basic.forever(function () {
    if (!(busy)) {
        showFace()
        changeWellbeing(-1)
    }
    basic.pause(2000)
})
```

## Learning Goals

- See how a virtual pet is built from standard MakeCode blocks — no hidden extension code
- Understand the wellbeing system: how activities change the score and how the face reflects it
- Modify and extend behaviors: copy a function, change the icons/sounds/moves, wire it to a button
- Learn event-driven programming, state management, and the idle loop pattern

## Concepts Covered

- Variables and state (`wellbeing`, `busy`, `sleeping`, `gameRunning`)
- Functions for organizing behaviors
- Event handlers (button presses, gestures, radio)
- Conditional logic (face thresholds, game collision)
- Radio communication between micro:bits
- Constrained values (`Math.constrain` for 0–100 range)
