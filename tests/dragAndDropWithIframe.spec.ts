import {expect} from '@playwright/test'
import {test} from '../test-options'

test.beforeEach(async ({page,globalsQaURL}) =>{
  await page.goto(globalsQaURL)
})

test('drag and drop with iframe', async({page}) =>{
  const frame = await page.frameLocator('[rel-title="Photo Manager"] iframe')
  const picture2 = await frame.locator('li',{hasText:'High Tatras 2'})
  const trash = await frame.locator('#trash')
  await picture2.dragTo(trash)

  //precise control
  const picture3 = await frame.locator('li',{hasText:'High Tatras 3'})
  await picture3.hover()
  await page.mouse.down()
  await trash.hover()
  await page.mouse.up()

  await expect(frame.locator('#trash ul li h5')).toHaveText(['High Tatras 3','High Tatras 2'])
})
