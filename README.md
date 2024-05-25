### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

# how to record the test
```shell
npx playwright codegen
```
# how to start an e2e automation testing 
## 1. playwright command

## 2. an easy model of test.spec.ts
```ts
import {test} from '@playwright/test'


test.beforeEach(async ({page})=> {
await page.goto('http://localhost:62127/')
})

test.describe('suite1',()=>{
test.beforeEach(async ({page})=> {
await page.getByText('Forms').click()
})
test('the first test',async ({page}) =>{
await page.getByText('Form Layouts').click()
})

test('navigate to datapicker page',async ({page}) =>{
await page.getByText('Datepicker').click()
})
})

test.describe('suite2',()=>{
test.beforeEach(async ({page})=> {
await page.getByText('Charts').click()
})
test('the first test1',async ({page}) =>{
await page.getByText('Form Layouts').click()
})

test('navigate to datapicker page2',async ({page}) =>{
await page.getByText('Datepicker').click()
})
})
```
## 3. how to locate the html element
![img.png](img.png)
```ts
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
```
best practice--user facing locator
```ts
test('user facing locator',async({page}) =>{
  page.getByRole('textbox')
  page.getByLabel('Email')
  page.getByPlaceholder('Email')
  page.getByText('Using the Grid')
  page.getByTitle('IoT Dashboard')
})

```
how to locate in multiple same locators
```ts
test('locate in multiple same locators',async({page}) =>{
  page.getByRole('button', {name:'Sign in'}).first()
  page.getByRole('button', {name:'Sign in'}).nth(3)
})
```
how to locate child locators
```ts
test('locate child locators',async({page}) =>{
  page.locator('nb-card').getByRole('button', {name:'Sign in'})
  page.locator('nb-card').locator('nb-radio')
})
```
how to locate parent locators
```ts

```
