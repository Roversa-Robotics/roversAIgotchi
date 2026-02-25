// roversAIgotchi - Starter Code for micro:bit
// A virtual AI pet you can feed, play with, and keep happy!
//
// Controls:
//   Button A       = Feed your Gotchi (reduces hunger)
//   Button B       = Play with your Gotchi (increases happiness)
//   Button A + B   = Check your Gotchi's stats
//   Shake          = Wake up your Gotchi

// ── Pet stats (0 = bad, 10 = great) ─────────────────────────────────────────
let hunger = 5      // 0 = very hungry, 10 = full
let happiness = 5   // 0 = sad, 10 = very happy
let energy = 10     // 0 = exhausted, 10 = fully rested
let isAsleep = false

// ── LED face images ──────────────────────────────────────────────────────────
const FACE_HAPPY = images.createImage(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
`)

const FACE_SAD = images.createImage(`
    . # . # .
    . # . # .
    . . . . .
    . # # # .
    # . . . #
`)

const FACE_HUNGRY = images.createImage(`
    . # . # .
    . . . . .
    . . . . .
    . # # # .
    . . # . .
`)

const FACE_SLEEP = images.createImage(`
    . . . . .
    . . . . .
    # # . # #
    . . . . .
    . . . . .
`)

const FACE_DEAD = images.createImage(`
    # . . . #
    . # . # .
    . . # . .
    . # . # .
    # . . . #
`)

// ── Helper: show the correct face based on current stats ────────────────────
function showFace() {
    if (isAsleep) {
        FACE_SLEEP.showImage(0)
        return
    }
    if (hunger <= 2 || happiness <= 2) {
        FACE_SAD.showImage(0)
    } else if (hunger >= 7 && happiness >= 7) {
        FACE_HAPPY.showImage(0)
    } else {
        FACE_HUNGRY.showImage(0)
    }
}

// ── Button A: Feed the Gotchi ────────────────────────────────────────────────
input.onButtonPressed(Button.A, function () {
    if (isAsleep) {
        basic.showString("Zzz")
        return
    }
    if (hunger < 10) {
        hunger = Math.min(hunger + 3, 10)
        basic.showIcon(IconNames.Heart)
        basic.pause(500)
    } else {
        basic.showString("Full!")
    }
    showFace()
})

// ── Button B: Play with the Gotchi ───────────────────────────────────────────
input.onButtonPressed(Button.B, function () {
    if (isAsleep) {
        basic.showString("Zzz")
        return
    }
    if (energy > 0) {
        happiness = Math.min(happiness + 2, 10)
        energy = Math.max(energy - 1, 0)
        basic.showIcon(IconNames.Happy)
        basic.pause(500)
    } else {
        basic.showString("Tired!")
    }
    showFace()
})

// ── Button A+B: Show stats ───────────────────────────────────────────────────
input.onButtonPressed(Button.AB, function () {
    basic.showString("H:" + hunger + " J:" + happiness + " E:" + energy)
    showFace()
})

// ── Shake: Wake up the Gotchi ────────────────────────────────────────────────
input.onGesture(Gesture.Shake, function () {
    if (isAsleep) {
        isAsleep = false
        energy = Math.min(energy + 3, 10)
        basic.showIcon(IconNames.Surprised)
        basic.pause(500)
        showFace()
    }
})

// ── Game loop: stats decay over time ─────────────────────────────────────────
basic.forever(function () {
    basic.pause(10000)   // every 10 seconds

    if (!isAsleep) {
        // Gotchi gets hungrier and less happy over time
        hunger = Math.max(hunger - 1, 0)
        happiness = Math.max(happiness - 1, 0)
        energy = Math.max(energy - 1, 0)

        // Fall asleep when exhausted
        if (energy <= 0) {
            isAsleep = true
        }
    } else {
        // Recover energy while sleeping
        energy = Math.min(energy + 2, 10)
        if (energy >= 8) {
            isAsleep = false
        }
    }

    showFace()
})

// ── Startup ───────────────────────────────────────────────────────────────────
basic.showString("Hi!")
showFace()
