def FollowMode():
    if Tinybit.Ultrasonic_Car() < 15:
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, 70)
    else:
        Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
def BreathLED():
    global j
    Tinybit.RGB_Car_Program().clear()
    for k in range(256):
        Tinybit.RGB_Car_Program().set_brightness(k)
        Tinybit.RGB_Car_Program().show_color(neopixel.colors(NeoPixelColors.PURPLE))
        Tinybit.RGB_Car_Program().show()
    j = 255
    for index in range(256):
        Tinybit.RGB_Car_Program().set_brightness(j)
        j += -1
        Tinybit.RGB_Car_Program().show_color(neopixel.colors(NeoPixelColors.PURPLE))
        Tinybit.RGB_Car_Program().show()

def on_bluetooth_connected():
    global connected, uartdata, distance, temp, str1, str2, CSB
    basic.show_leds("""
        . . . . .
                # . . . #
                # # # # #
                # . . . #
                . # # # .
    """)
    basic.pause(1000)
    Tinybit.RGB_Car_Big(Tinybit.enColor.RED)
    connected = 1
    while connected == 1:
        uartdata = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        CarCtrl()
        domusic()
        SevenColorLED()
        SevenWaterLED()
        ModeSelect()
        distance = Tinybit.Ultrasonic_Car()
        temp = input.temperature()
        str1 = "" + str(distance) + ""
        str1 = "" + str1 + ","
        str2 = "" + str(temp) + ""
        str2 = "" + str2 + "#"
        CSB = "$CSB" + str1 + str2
        bluetooth.uart_write_string(CSB)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    global connected
    basic.show_leds("""
        # # . # #
                # # . # #
                . . . . .
                . # # # .
                # . . . #
    """)
    connected = 0
    Tinybit.RGB_Car_Big(Tinybit.enColor.BLUE)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def domusic():
    music.set_volume(127)
    music.set_built_in_speaker_enabled(False)
    if uartdata == "1":
        music.play_tone(262, music.beat(BeatFraction.HALF))
    elif uartdata == "2":
        music.play_tone(294, music.beat(BeatFraction.HALF))
    elif uartdata == "3":
        music.play_tone(330, music.beat(BeatFraction.HALF))
    elif uartdata == "4":
        music.play_tone(349, music.beat(BeatFraction.HALF))
    elif uartdata == "5":
        music.play_tone(392, music.beat(BeatFraction.HALF))
    elif uartdata == "6":
        music.play_tone(440, music.beat(BeatFraction.HALF))
    elif uartdata == "7":
        music.play_tone(494, music.beat(BeatFraction.HALF))
    elif uartdata == "8":
        music.play_tone(262, music.beat(BeatFraction.HALF))
    elif uartdata == "B1":
        music.play_tone(277, music.beat(BeatFraction.HALF))
    elif uartdata == "B2":
        music.play_tone(311, music.beat(BeatFraction.HALF))
    elif uartdata == "B3":
        music.play_tone(370, music.beat(BeatFraction.HALF))
    elif uartdata == "B4":
        music.play_tone(415, music.beat(BeatFraction.HALF))
    elif uartdata == "B5":
        music.play_tone(466, music.beat(BeatFraction.HALF))
    elif uartdata == "O":
        music.set_volume(0)
def ModeSelect():
    global g_mode
    if uartdata == "S":
        g_mode = 1
    elif uartdata == "T":
        g_mode = 2
    elif uartdata == "U":
        g_mode = 3
    elif uartdata == "V":
        g_mode = 0
        basic.show_leds("""
            . . . . .
                        # . . . #
                        # # # # #
                        # . . . #
                        . # # # .
        """)
        Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
def AvoidMode():
    if Tinybit.Ultrasonic_Car() < 15:
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINLEFT, 90)
        basic.pause(400)
    else:
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, 100)
def HorseLED():
    Tinybit.RGB_Car_Program().set_brightness(255)
    Tinybit.RGB_Car_Program().set_pixel_color(0, neopixel.colors(NeoPixelColors.RED))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().set_pixel_color(1, neopixel.colors(NeoPixelColors.GREEN))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().set_pixel_color(2, neopixel.colors(NeoPixelColors.BLUE))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
def TrackingMode():
    if Tinybit.Line_Sensor(Tinybit.enPos.LEFT_STATE, Tinybit.enLineState.WHITE) and Tinybit.Line_Sensor(Tinybit.enPos.RIGHT_STATE, Tinybit.enLineState.WHITE):
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, 80)
    elif Tinybit.Line_Sensor(Tinybit.enPos.LEFT_STATE, Tinybit.enLineState.WHITE) and Tinybit.Line_Sensor(Tinybit.enPos.RIGHT_STATE, Tinybit.enLineState.BLACK):
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINRIGHT, 70)
    elif Tinybit.Line_Sensor(Tinybit.enPos.LEFT_STATE, Tinybit.enLineState.BLACK) and Tinybit.Line_Sensor(Tinybit.enPos.RIGHT_STATE, Tinybit.enLineState.WHITE):
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINLEFT, 70)
    else:
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_STOP, 0)
def WaterLED():
    Tinybit.RGB_Car_Program().set_brightness(255)
    Tinybit.RGB_Car_Program().set_pixel_color(0, neopixel.colors(NeoPixelColors.GREEN))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().set_pixel_color(1, neopixel.colors(NeoPixelColors.GREEN))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().set_pixel_color(2, neopixel.colors(NeoPixelColors.GREEN))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
def SevenColorLED():
    if uartdata == "G":
        Tinybit.RGB_Car_Big(Tinybit.enColor.RED)
    elif uartdata == "H":
        Tinybit.RGB_Car_Big(Tinybit.enColor.GREEN)
    elif uartdata == "I":
        Tinybit.RGB_Car_Big(Tinybit.enColor.BLUE)
    elif uartdata == "J":
        Tinybit.RGB_Car_Big(Tinybit.enColor.YELLOW)
    elif uartdata == "K":
        Tinybit.RGB_Car_Big(Tinybit.enColor.CYAN)
    elif uartdata == "L":
        Tinybit.RGB_Car_Big(Tinybit.enColor.PINKISH)
    elif uartdata == "M":
        Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
def CarCtrl():
    if uartdata == "A":
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, 150)
    elif uartdata == "B":
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_BACK, 150)
    elif uartdata == "C":
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_LEFT, 150)
    elif uartdata == "D":
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RIGHT, 150)
    elif uartdata == "E":
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINLEFT, 150)
    elif uartdata == "F":
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINRIGHT, 150)
    elif uartdata == "0":
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RIGHT, 0)
def SevenWaterLED():
    global g_RGBMode
    if uartdata == "N":
        g_RGBMode = 1
    elif uartdata == "P":
        g_RGBMode = 2
    elif uartdata == "Q":
        g_RGBMode = 3
    elif uartdata == "R":
        g_RGBMode = 4
    elif uartdata == "W":
        g_RGBMode = 5
g_blue = 0
g_Green = 0
g_Red = 0
CSB = ""
str2 = ""
str1 = ""
temp = 0
distance = 0
uartdata = ""
j = 0
g_mode = 0
g_RGBMode = 0
connected = 0
i = 0
item = ""
basic.show_leds("""
    . # . # .
        . # . # .
        # # # # #
        . # # # .
        . . # . .
""")
Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
Tinybit.RGB_Car_Big(Tinybit.enColor.RED)
bluetooth.start_uart_service()
basic.show_leds("""
    . # # # .
        # . . . .
        . # # . .
        . . . # .
        # # # . .
""")
connected = 0
g_RGBMode = 0
g_mode = 0

def on_forever():
    if input.rotation(Rotation.PITCH) < -15:
        Tinybit.RGB_Car_Big2(randint(0, 255), randint(0, 255), randint(0, 255))
basic.forever(on_forever)

def on_forever2():
    global g_Red, g_Green, g_blue, g_RGBMode
    if g_mode == 1:
        TrackingMode()
    elif g_mode == 2:
        AvoidMode()
    elif g_mode == 3:
        FollowMode()
    if g_RGBMode == 5:
        Tinybit.RGB_Car_Program().clear()
        Tinybit.RGB_Car_Program().show()
    elif g_RGBMode == 1:
        Tinybit.RGB_Car_Program().clear()
        WaterLED()
    elif g_RGBMode == 2:
        Tinybit.RGB_Car_Program().clear()
        HorseLED()
    elif g_RGBMode == 3:
        Tinybit.RGB_Car_Program().clear()
        BreathLED()
    elif g_RGBMode == 4:
        Tinybit.RGB_Car_Program().clear()
        Tinybit.RGB_Car_Program().set_brightness(200)
        g_Red = randint(0, 255)
        g_Green = randint(0, 255)
        g_blue = randint(0, 255)
        Tinybit.RGB_Car_Program().show_color(neopixel.rgb(g_Red, g_Green, g_blue))
        Tinybit.RGB_Car_Program().show()
        g_RGBMode = 0
    basic.pause(10)
basic.forever(on_forever2)

def on_forever3():
    if input.rotation(Rotation.PITCH) < -15:
        basic.show_arrow(ArrowNames.SOUTH)
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, 75)
        basic.pause(500)
        Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
        basic.show_icon(IconNames.CHESSBOARD)
basic.forever(on_forever3)
