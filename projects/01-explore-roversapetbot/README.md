---
title: Explore PetBot
parent: Projects
nav_order: 2
permalink: /projects/01-explore-roversapetbot/
---

# 01 — Explore PetBot's Behaviors

Starter code that lets students interact with Roversa's buttons and explore how different activities affect PetBot's wellbeing. Students press buttons, observe PetBot's reactions, and discover cause-and-effect relationships between digital/physical activities and wellbeing.

## Try It

Press **Edit** to open in MakeCode, or **Run** to try it in the simulator right here:

<div style="position:relative;height:0;padding-bottom:70%;overflow:hidden;max-width:100%;margin:1em 0;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    src="https://makecode.microbit.org/---codeembed#pub:S50637-53907-35477-98778"
    allowfullscreen="allowfullscreen" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
</div>

**[Open in MakeCode](https://makecode.microbit.org/S50637-53907-35477-98778)**

## What the Code Does

The program maps each Roversa button to a different activity. When PetBot starts, it initializes with `roversaPetBot.start()` and waits for input:

| Input | Button | Action | What PetBot Does |
|-------|--------|--------|-----------------|
| Forward (P13) | ⬆️ | `goRun()` | PetBot goes for a run |
| Reverse (P14) | ⬇️ | `goSleep()` | PetBot goes to sleep |
| Right turn (P15) | ↪️ | `textFriend()` | PetBot texts a friend |
| Stop (P9) | ⏹️ | `scrollSocialMedia()` | PetBot scrolls social media |
| Left turn (P16) | ↩️ | `playGame(1, -10)` | PetBot plays a video game |
| Menu (P5) | ⚪ | `showStats()` | Shows PetBot's current wellbeing stats |
| Logo touch | — | `wakeUp(0, Neutral)` | Wakes PetBot up (neutral mood) |
| Screen face-down | — | `wakeUp(-10, Surprised)` | Wakes PetBot up (surprised, wellbeing drops) |

Each activity affects PetBot's internal wellbeing differently — some activities boost it, others lower it. Students can check the current state at any time using `showStats()`.

## Code

```blocks
roversa.onEvent(RoversaPin.P13, RoversaEvent.Click, function () {
    roversaPetBot.goRun()
})
roversa.onEvent(RoversaPin.P14, RoversaEvent.Click, function () {
    roversaPetBot.goSleep()
})
roversa.onEvent(RoversaPin.P15, RoversaEvent.Click, function () {
    roversaPetBot.textFriend()
})
roversa.onEvent(RoversaPin.P9, RoversaEvent.Click, function () {
    roversaPetBot.scrollSocialMedia()
})
roversa.onEvent(RoversaPin.P16, RoversaEvent.Click, function () {
    roversaPetBot.playGame(1, -10)
})
roversa.onEvent(RoversaPin.P5, RoversaEvent.Click, function () {
    roversaPetBot.showStats()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    roversaPetBot.wakeUp(0, Emotion.Neutral)
})
input.onGesture(Gesture.ScreenDown, function () {
    roversaPetBot.wakeUp(-10, Emotion.Surprised)
})
roversaPetBot.start()
```

## How to Use in a Lesson

**Exploration (~20 min):** Students try each button and document their observations on an observation sheet — what happened, how PetBot's face changed, what they think it means for wellbeing.

> Tip: Point students to the face as a quick feedback loop: *"Look at your robot — how is it feeling right now? What did you do that changed its face?"*

**Discussion (~15 min):** Use the observation sheets as evidence to discuss:

- Which PetBot responses surprised you? What relationships did you notice between different buttons and PetBot's wellbeing?
- What evidence shows a cause-and-effect relationship between a button press, PetBot's behavior, and a change in wellbeing?
- How do PetBot's programmed responses show that digital activities and everyday choices can affect wellbeing in different ways?

After discussion, share the **PetBot Wellbeing Behavior Key** so the class can compare results. Emphasize that the goal is not to get the "right" answer, but to use evidence from testing to identify patterns.

- How did your observations compare to the Behavior Key? What matched, and what did you notice differently?
- What patterns do you see in how PetBot was programmed to respond to different kinds of activities?
- What does this model suggest about digital wellbeing, balance, and everyday choices — and what are its limits as a model of real human wellbeing?

## Concepts Covered

- Cause and effect through hands-on testing
- Observation and evidence-based reasoning
- Digital wellbeing and balanced technology use
- Event-driven programming (buttons trigger actions)
