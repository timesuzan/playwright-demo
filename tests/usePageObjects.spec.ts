import {test,expect} from '@playwright/test'
import {PageManeger} from "../page-objects/pageManeger";

test.beforeEach(async ({page}) =>{
  await page.goto('http://localhost:4200/')
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
  await pm.naviagteTo().formLayoutPage()
  await pm.onFormLayouts().submitUsingTheGridFrom('yu.tian@163.com','123456','Option 1')
  await pm.onFormLayouts().submitInlineFrom('yu tian','yu.tian@163.com',true)

  await pm.naviagteTo().datePcikerPage()
  await pm.onDatePicker().selectDateInCalendarFromToday(15)
  await pm.onDatePicker().selectDateRangeInCalendarFromToday(16,21)
})
