import {Locator, Page} from "@playwright/test"
import {HelperBase} from "./helperBase";

export class FormLayoutsPage extends HelperBase{


  constructor(page: Page) {
    super(page)
  }

  async submitUsingTheGridFrom(email:string,password:string,option:string){
    const usingTheGridFrom = await this.page.locator('nb-card',{hasText : 'Using the Grid'})
    await usingTheGridFrom.getByPlaceholder('Email').fill(email)
    await usingTheGridFrom.getByPlaceholder('Password').fill(password)
    await usingTheGridFrom.getByRole('radio',{name:option})
    await usingTheGridFrom.getByRole('button',{name:'Sign in'}).click()
  }

  /**
   * fill the inline form
   * @param name include the first name and last name
   * @param email must have the email format
   * @param rememberMe only have 2 value: true ｜ false
   */
  async submitInlineFrom(name:string,email:string,rememberMe:boolean){
    const InlineFrom = await this.page.locator('nb-card',{hasText : 'Inline form'})
    await InlineFrom.getByPlaceholder('Jane Doe').fill(name)
    await InlineFrom.getByPlaceholder('Email').fill(email)
    if(rememberMe)
      await InlineFrom.getByRole('checkbox').click({force:true})
    await InlineFrom.getByRole('button',{name:'Submit'}).click()
  }
}
