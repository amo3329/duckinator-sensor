radio.onReceivedNumber(function (receivedNumber) {
    duck_count = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
})
radio.onReceivedString(function (receivedString) {
    duck_count += 1
    if (duck_count >= 5) {
        radio.sendNumber(duck_count)
        while (duck_count >= 5) {
            basic.showString("FULL")
        }
    } else {
        basic.showNumber(duck_count)
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("")
})
let duck_count = 0
radio.setGroup(111)
pins.digitalWritePin(DigitalPin.P2, 1)
basic.pause(1000)
let lightlevelvar = input.lightLevel()
duck_count = 0
basic.forever(function () {
    if (input.lightLevel() < lightlevelvar - 32) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
        radio.sendString("duck caught")
        pins.servoWritePin(AnalogPin.P0, 180)
        basic.pause(5000)
        pins.servoWritePin(AnalogPin.P1, 180)
        basic.pause(5000)
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {
        if (duck_count >= 5) {
            pins.servoWritePin(AnalogPin.P0, 180)
        } else {
            pins.servoWritePin(AnalogPin.P0, 0)
            basic.pause(2000)
            pins.servoWritePin(AnalogPin.P1, 0)
        }
    }
})
