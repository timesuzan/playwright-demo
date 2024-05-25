import {Locator, Page} from "@playwright/test"
import {HelperBase} from "./helperBase";


export class NaviagationPage extends HelperBase{
  readonly formLayoutMenuItem: Locator
  readonly datePickerMenuItem: Locator
  readonly toolMenuItem: Locator
  readonly smartTableMenuItem: Locator

  constructor(page: Page) {
    super(page)
    this.formLayoutMenuItem = page.getByText('Form Layouts');
    this.datePickerMenuItem = page.getByText('Datepicker');
    this.toolMenuItem = page.getByText('Tooltip');
    this.smartTableMenuItem = page.getByText('Smart Table');
  }

  async formLayoutPage(){
    await this.selectGroupMenuItem('Forms')
    await this.formLayoutMenuItem.click()
  }

  async datePcikerPage(){
    await this.selectGroupMenuItem('Forms')
    await this.datePickerMenuItem.click()
  }

  async tooltipPage(){
    await this.selectGroupMenuItem('Modal & Overlays')
    await this.toolMenuItem.click()
  }

  async smartTablePage(){
    await this.selectGroupMenuItem('Tables & Data')
    await this.smartTableMenuItem.click()
  }

  private async selectGroupMenuItem(groupItemTitle: string){
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expentedState = await groupMenuItem.getAttribute('aria-expanded')
    if(expentedState == "false")
        await groupMenuItem.click()


  }
}
