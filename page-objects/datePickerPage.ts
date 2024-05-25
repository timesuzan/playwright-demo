import {expect, Locator, Page} from "@playwright/test"
import {HelperBase} from "./helperBase";

export class DatePickerPage extends HelperBase{
  constructor(page:Page) {
    super(page);
  }

  async selectDateInCalendarFromToday(daysFromToday:number){
    const formPicker = await this.page.getByPlaceholder('Form Picker')
    await formPicker.click()
    const dateToAssert = await this.selectDateInCalendar(daysFromToday)
    await expect(formPicker).toHaveValue(dateToAssert)
  }

  async selectDateRangeInCalendarFromToday(startDayFromToday:number,endDayFromToday:number){
    const formPicker = await this.page.getByPlaceholder('Range Picker')
    await formPicker.click()
    const startDateToAssert = await this.selectDateInCalendar(startDayFromToday)
    const endDateToAssert = await this.selectDateInCalendar(endDayFromToday)
    const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`
    await expect(formPicker).toHaveValue(dateToAssert)
  }


  private async selectDateInCalendar(daysFromToday){
    let date = new Date()
    date.setDate(date.getDate()+daysFromToday)
    const expecteddate = date.getDate().toString()
    const expectdMonthShort = date.toLocaleString('En-US',{month:'short'})
    const expectdMonthLong = date.toLocaleString('En-US',{month:'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectdMonthShort} ${expecteddate}, ${expectedYear}`
    const expectedMonthAndYear = `${expectdMonthLong} ${expectedYear}`

    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
      const nextButton = await this.page.locator('nb-calendar-pageable-navigation').getByRole('button').nth(1)
      await nextButton.click()
      calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    }
    const dataChoice = await this.page.locator('.day-cell.ng-star-inserted').getByText(expecteddate,{exact:true})
    await dataChoice.click()
    return dateToAssert
  }
}
