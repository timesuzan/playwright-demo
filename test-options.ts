import {test as base} from '@playwright/test';
import {PageManeger} from "../pw-practice-app/page-objects/pageManeger";

export type TestOptions ={
  globalsQaURL: string
  formLayoutsPage: string
  pageManager: PageManeger
}

export const test = base.extend<TestOptions>({
  globalsQaURL: ['', {option: true}],
  formLayoutsPage: async({page},use) =>{
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await use('')
  },
  pageManager: async({page,formLayoutsPage},use) =>{
    const pm = new PageManeger(page)
    await use(pm)
  }
})
