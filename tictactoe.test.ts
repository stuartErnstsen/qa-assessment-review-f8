import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

const startGame = async () => {
    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
}

beforeEach(async () => {
    await driver.get('http://localhost:4000')
    await startGame()
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {
    // let startArr = await driver.findElements(By.id('start-game'))
    // const isStartFound = startArr.length !== 0

    let startArr = await driver.findElements(By.id("start-game"))
    expect(startArr).toEqual([])

    // expect(isStartFound).toBe(false)

    await driver.sleep(1000)

});

const checkSquare = async (cellIndex) => {
    let square = await driver.findElement(By.id(`cell-${cellIndex}`))
    await square.click();

    let text = await square.getText()

    expect(text).toBe('X')
    await driver.sleep(1000)
}

describe('Check all the squares', () => {
    test('Play top-left square', async () => {
        await checkSquare(0)
    })
    test('Play top-right square', async () => {
        await checkSquare(2)
    })
    test('Play bottom-left square', async () => {
        await checkSquare(6)
    })
    test('Play bottom-right square', async () => {
        await checkSquare(8)
    })
})

test('Check winner text', async () => {
    checkSquare(0)
    checkSquare(4)
    checkSquare(8)

    const displayText = await driver.findElement(By.xpath('//h1')).getText()
    console.log(displayText)

    expect(displayText).toBe('X won')
    await driver.sleep(5000)
})


test('Check if O plays after X', async () => {
    await checkSquare(6)

    const oList = await driver.findElements(By.xpath('//td[text()="O" or text()="o"]'))


    // const pizzaArr = [...new Array(10)].map(el => 'pizza')
    // console.log(pizzaArr)

    // for (let index in [...new Array(100)]) {
    //     console.log(index)
    // }

    console.log(oList.length)
    expect(oList).toBeGreaterThan(0)
})

