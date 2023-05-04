function FollowMode() {
    if (Tinybit.Ultrasonic_Car() < 15) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 70)
    } else {
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    }
    
}

function BreathLED() {
    
    Tinybit.RGB_Car_Program().clear()
    for (let k = 0; k < 256; k++) {
        Tinybit.RGB_Car_Program().setBrightness(k)
        Tinybit.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        Tinybit.RGB_Car_Program().show()
    }
    j = 255
    for (let index = 0; index < 256; index++) {
        Tinybit.RGB_Car_Program().setBrightness(j)
        j += -1
        Tinybit.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        Tinybit.RGB_Car_Program().show()
    }
}

bluetooth.onBluetoothConnected(function on_bluetooth_connected() {
    
    basic.showLeds(`
        . . . . .
                # . . . #
                # # # # #
                # . . . #
                . # # # .
    `)
    basic.pause(1000)
    Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
    connected = 1
    while (connected == 1) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        CarCtrl()
        domusic()
        SevenColorLED()
        SevenWaterLED()
        ModeSelect()
        distance = Tinybit.Ultrasonic_Car()
        temp = input.temperature()
        str1 = "" + ("" + distance) + ""
        str1 = "" + str1 + ","
        str2 = "" + ("" + temp) + ""
        str2 = "" + str2 + "#"
        CSB = "$CSB" + str1 + str2
        bluetooth.uartWriteString(CSB)
    }
})
bluetooth.onBluetoothDisconnected(function on_bluetooth_disconnected() {
    
    basic.showLeds(`
        # # . # #
                # # . # #
                . . . . .
                . # # # .
                # . . . #
    `)
    connected = 0
    Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
})
function domusic() {
    music.setVolume(127)
    music.setBuiltInSpeakerEnabled(false)
    if (uartdata == "1") {
        music.playTone(262, music.beat(BeatFraction.Half))
    } else if (uartdata == "2") {
        music.playTone(294, music.beat(BeatFraction.Half))
    } else if (uartdata == "3") {
        music.playTone(330, music.beat(BeatFraction.Half))
    } else if (uartdata == "4") {
        music.playTone(349, music.beat(BeatFraction.Half))
    } else if (uartdata == "5") {
        music.playTone(392, music.beat(BeatFraction.Half))
    } else if (uartdata == "6") {
        music.playTone(440, music.beat(BeatFraction.Half))
    } else if (uartdata == "7") {
        music.playTone(494, music.beat(BeatFraction.Half))
    } else if (uartdata == "8") {
        music.playTone(262, music.beat(BeatFraction.Half))
    } else if (uartdata == "B1") {
        music.playTone(277, music.beat(BeatFraction.Half))
    } else if (uartdata == "B2") {
        music.playTone(311, music.beat(BeatFraction.Half))
    } else if (uartdata == "B3") {
        music.playTone(370, music.beat(BeatFraction.Half))
    } else if (uartdata == "B4") {
        music.playTone(415, music.beat(BeatFraction.Half))
    } else if (uartdata == "B5") {
        music.playTone(466, music.beat(BeatFraction.Half))
    } else if (uartdata == "O") {
        music.setVolume(0)
    }
    
}

function ModeSelect() {
    
    if (uartdata == "S") {
        g_mode = 1
    } else if (uartdata == "T") {
        g_mode = 2
    } else if (uartdata == "U") {
        g_mode = 3
    } else if (uartdata == "V") {
        g_mode = 0
        basic.showLeds(`
            . . . . .
                        # . . . #
                        # # # # #
                        # . . . #
                        . # # # .
        `)
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    }
    
}

function AvoidMode() {
    if (Tinybit.Ultrasonic_Car() < 15) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 90)
        basic.pause(400)
    } else {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 100)
    }
    
}

function HorseLED() {
    Tinybit.RGB_Car_Program().setBrightness(255)
    Tinybit.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
}

function TrackingMode() {
    if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 80)
    } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 70)
    } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 70)
    } else {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Stop, 0)
    }
    
}

function WaterLED() {
    Tinybit.RGB_Car_Program().setBrightness(255)
    Tinybit.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
}

function SevenColorLED() {
    if (uartdata == "G") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
    } else if (uartdata == "H") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Green)
    } else if (uartdata == "I") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
    } else if (uartdata == "J") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Yellow)
    } else if (uartdata == "K") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Cyan)
    } else if (uartdata == "L") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Pinkish)
    } else if (uartdata == "M") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
    }
    
}

function CarCtrl() {
    if (uartdata == "A") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 150)
    } else if (uartdata == "B") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Back, 150)
    } else if (uartdata == "C") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Left, 150)
    } else if (uartdata == "D") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Right, 150)
    } else if (uartdata == "E") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 150)
    } else if (uartdata == "F") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 150)
    } else if (uartdata == "0") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Right, 0)
    }
    
}

function SevenWaterLED() {
    
    if (uartdata == "N") {
        g_RGBMode = 1
    } else if (uartdata == "P") {
        g_RGBMode = 2
    } else if (uartdata == "Q") {
        g_RGBMode = 3
    } else if (uartdata == "R") {
        g_RGBMode = 4
    } else if (uartdata == "W") {
        g_RGBMode = 5
    }
    
}

let g_blue = 0
let g_Green = 0
let g_Red = 0
let CSB = ""
let str2 = ""
let str1 = ""
let temp = 0
let distance = 0
let uartdata = ""
let j = 0
let g_mode = 0
let g_RGBMode = 0
let connected = 0
let i = 0
let item = ""
basic.showLeds(`
    . # . # .
        . # . # .
        # # # # #
        . # # # .
        . . # . .
`)
Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
bluetooth.startUartService()
basic.showLeds(`
    . # # # .
        # . . . .
        . # # . .
        . . . # .
        # # # . .
`)
connected = 0
g_RGBMode = 0
g_mode = 0
basic.forever(function on_forever() {
    if (input.rotation(Rotation.Pitch) < -15) {
        Tinybit.RGB_Car_Big2(randint(0, 255), randint(0, 255), randint(0, 255))
    }
    
})
basic.forever(function on_forever2() {
    
    if (g_mode == 1) {
        TrackingMode()
    } else if (g_mode == 2) {
        AvoidMode()
    } else if (g_mode == 3) {
        FollowMode()
    }
    
    if (g_RGBMode == 5) {
        Tinybit.RGB_Car_Program().clear()
        Tinybit.RGB_Car_Program().show()
    } else if (g_RGBMode == 1) {
        Tinybit.RGB_Car_Program().clear()
        WaterLED()
    } else if (g_RGBMode == 2) {
        Tinybit.RGB_Car_Program().clear()
        HorseLED()
    } else if (g_RGBMode == 3) {
        Tinybit.RGB_Car_Program().clear()
        BreathLED()
    } else if (g_RGBMode == 4) {
        Tinybit.RGB_Car_Program().clear()
        Tinybit.RGB_Car_Program().setBrightness(200)
        g_Red = randint(0, 255)
        g_Green = randint(0, 255)
        g_blue = randint(0, 255)
        Tinybit.RGB_Car_Program().showColor(neopixel.rgb(g_Red, g_Green, g_blue))
        Tinybit.RGB_Car_Program().show()
        g_RGBMode = 0
    }
    
    basic.pause(10)
})
basic.forever(function on_forever3() {
    if (input.rotation(Rotation.Pitch) < -15) {
        basic.showArrow(ArrowNames.South)
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 75)
        basic.pause(500)
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
        basic.showIcon(IconNames.Chessboard)
    }
    
})
