import {test,expect} from '@playwright/test'
import {PageManeger} from "../page-objects/pageManeger";
import {faker} from '@faker-js/faker'


test.beforeEach(async ({page}) =>{
  await page.goto('/')
})

test('naviagate to form page', async({page})=>{
  const pm = new PageManeger(page)
  await pm.naviagteTo().tooltipPage()
  await pm.naviagteTo().formLayoutPage()
  await pm.naviagteTo().datePcikerPage()
  await pm.naviagteTo().smartTablePage()
})

test('parameterize methods', async ({page})=>{
  const pm = new PageManeger(page)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@tester.com`
  await pm.naviagteTo().formLayoutPage()

  await pm.onFormLayouts().submitUsingTheGridFrom(process.env.EMAIL,process.env.PASSWORD,'Option 1')
  await pm.onFormLayouts().submitInlineFrom(randomFullName,randomEmail,true)
  await page.screenshot({path: 'screenshot/formLayoutPage.png'})
  const buffer = page.screenshot()
  console.log(buffer)
  await page.locator('nb-card',{hasText : 'Inline form'}).screenshot({path: 'screenshot/inlineFormPage.png'})
  await pm.naviagteTo().datePcikerPage()
  await pm.onDatePicker().selectDateInCalendarFromToday(15)
  await pm.onDatePicker().selectDateRangeInCalendarFromToday(16,21)
})
