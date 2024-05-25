import {test} from '@playwright/test'


test.beforeEach(async ({page})=> {
  await page.goto('http://localhost:4200/')
})

test('Locator systax rules', async({page}) => {
  //by tag name
  page.locator('input')
  //by id
  page.locator('inputEmail1')
  //by class value
  page.locator('.shape-rectangle')
  //by attribute
  page.locator('[placeholder="Email"]')
  //by class value(full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
  //combine different selectors
  page.locator('input[placeholder="Email"][nbinput]')
  //by xpath (not recommended)
  page.locator('//*[@id="inputEmail1"]')
  //by partial test match
  page.locator(':text("Using")')
  //by exact text match
  page.locator(':text-is("Using the Grid")')
})

test('user facing locator',async({page}) =>{
  page.getByRole('textbox')
  page.getByLabel('Email')
  page.getByPlaceholder('Email')
  page.getByText('Using the Grid')
  page.getByTitle('IoT Dashboard')
})

test('locate in multiple same locators',async({page}) =>{
  page.getByRole('button', {name:'Sign in'}).first()
  page.getByRole('button', {name:'Sign in'}).nth(3)
})

test('locate child locators',async({page}) =>{
  page.locator('nb-card').getByRole('button', {name:'Sign in'})
  page.locator('nb-card').locator('nb-radio')
})

