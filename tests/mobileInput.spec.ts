import {expect, test} from '@playwright/test'

test('input field', async({page},testInfo) =>{
  await page.goto('/')
  if(testInfo.project.name='mobile'){
    await page.locator('.sidebar-toggle').click()
  }
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
  if(testInfo.project.name='mobile'){
    await page.locator('.sidebar-toggle').click()
  }
  const inputField = await page.locator('nb-card',{hasText : 'Using the Grid'}).getByPlaceholder('Email')
  await inputField.fill('boss@com.cn')
  await expect(inputField).toHaveValue('boss@com.cn')
})
