import {test,expect} from '@playwright/test'

test.beforeEach(async ({page}) =>{
  await page.goto('/')
})

test.describe('form layouts page', () =>{
  test.describe.configure({retries:2})
  test.beforeEach(async ({page}) =>{
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input field', async({page},testInfo) =>{
    if(testInfo.retry){
      console.log("the second time to exacute")
    }
    test.setTimeout(10000);
    const inputField = await page.locator('nb-card',{hasText : 'Using the Grid'}).getByPlaceholder('Email')
    await inputField.fill('boss@com.cn')
    await expect(inputField).toHaveValue('boss@com.cn')
  })

  test('radio button', async({page}) =>{
    const option1 = await page.locator('nb-card',{hasText : 'Using the Grid'}).getByRole('radio',{name:'Option 1'})
    await option1.check({force:true})
    await expect(option1.isChecked()).toBeTruthy()
  })



})

test.describe('Modal & Overlays', () => {
  test.beforeEach(async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
  })

  test('checkbox', async ({page}) => {
    const hideOnClickChexbox = await page.getByRole('checkbox', {name: 'Hide on click'})
    const showToastWithIcon = await page.getByRole('checkbox', {name: 'Show toast with icon'})
    await hideOnClickChexbox.uncheck({force:true})
    await showToastWithIcon.uncheck({force:true})
    const allCheckboxes = await page.getByRole('checkbox')
    for (const box of await allCheckboxes.all()){
      await box.check({force:true})
      expect(await box.isChecked()).toBeTruthy()
    }
  })


})


test('tooltips', async ({page}) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Tooltip').click()
  const showTooltipButton1 = await page.getByRole('button', {name: 'Show Tooltip'}).nth(0)
  await showTooltipButton1.hover()
  await expect(page.getByText('This is a tooltip')).toBeVisible()


})

test.describe('list and dropdowns', () => {
  test('list and dropdowns', async({page}) =>{
    const schemeButton = await page.locator('nb-layout-header ngx-header nb-select').getByRole('button')
    await schemeButton.click()

    await page.getByRole('list') //get UI tag
    await page.getByRole('listitem') //get by LI tag

    const dropDownlist = await page.locator('nb-option-list nb-option')
    const selectButtonList = ['Light','Dark','Cosmic','Corporate']
    await expect(dropDownlist).toHaveText(selectButtonList)
    await dropDownlist.getByText('Light').click()
    const layoutHeader = page.locator('nb-layout-header')
    await expect(layoutHeader).toHaveCSS('background-color','rgb(255, 255, 255)')

    const colorCSS = {
      'Light': 'rgb(255, 255, 255)',
      'Dark': 'rgb(34, 43, 69)',
      'Cosmic': 'rgb(50, 50, 89)',
      'Corporate': 'rgb(255, 255, 255)',
    }

    await schemeButton.click()
    for (const color in colorCSS){
      await dropDownlist.getByText(color).click()
      await expect(layoutHeader).toHaveCSS('background-color',colorCSS[color])
      if(color != 'Corporate'){
        await schemeButton.click()
      }
    }

  })

})

test('dialog boxes', async({page}) =>{
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Dialog').click()
  const openDialogWithComponentButton = await page.getByText('Open Dialog with component')
  const dialogHeader = await page.locator('ngx-showcase-dialog nb-card').getByText('This is a title passed to the dialog component')
  const dialogdismissButton = await page.locator('ngx-showcase-dialog nb-card').getByRole('button',{name:'DISMISS DIALOG'})
  await openDialogWithComponentButton.click()
  await expect(dialogHeader).toBeVisible()
  await dialogdismissButton.click()
  await expect(dialogHeader).toBeHidden()
})

test.describe('Tables & Data', () =>{
  test.beforeEach(async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
  })
  test('modify the date of a table cell', async({page}) =>{
    const smartTableBody = await page.locator('ngx-smart-table table tbody')
    const smartTableBodyRow = await smartTableBody.getByRole('row',{name:'twitter@outlook.com'})
    const smartTableBodyRowModifyButton = smartTableBodyRow.getByRole('link').nth(0)
    await smartTableBodyRowModifyButton.click()
    const smartTableBodyRowModifyAge = await page.locator('input-editor').getByPlaceholder('First Name')
    await smartTableBodyRowModifyAge.clear()
    await smartTableBodyRowModifyAge.fill('Poli')
    await page.locator('.nb-checkmark').click()
    await expect(smartTableBodyRow.locator('td').nth(2)).toHaveText('Poli')
  })

  test('use the filter', async({page}) =>{
    const ages = ["20","30","100"]

    for(let age of ages){
      const inputAgeFilter = await page.locator('input-filter').getByPlaceholder('Age')
      await inputAgeFilter.clear()
      await inputAgeFilter.fill(age)
      await page.waitForTimeout(600)
      const filterRow = await page.locator('tbody tr')
      for(let row of await filterRow.all()){
        const cellValue = await row.locator('td').last().textContent()
        if(age =='100'){
          const noDataFound= await page.getByText(' No data found ')
          await expect(noDataFound).toBeVisible()
        }
        else{
          await expect(cellValue).toEqual(age)
        }
      }
    }

  })

  test('navigate to the next page', async({page}) =>{
    const nextPageButton = await page.locator('ng2-smart-table-pager').getByRole('link',{name:'Next'})
    await nextPageButton.click()
    const tartgetEmail = await page.locator('ngx-smart-table table tbody').getByRole('row',{name:'mark@gmail.com'}).locator('td').nth(5)
    await expect(tartgetEmail).toBeVisible()
  })

})

test.describe('data picker', () =>{
  test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
  })

  test('date picker in this month', async({page}) =>{
    const formPicker = await page.getByPlaceholder('Form Picker')
    await formPicker.click()
    const dataChoice = await page.locator('nb-calendar-picker').getByText('17')
    await dataChoice.click()
    await expect(formPicker).toHaveValue('May 17, 2024')
  })

  test('date picker in the next month', async({page}) =>{
    let date = new Date()
    date.setDate(date.getDate()+14)
    const expecteddate = date.getDate().toString()
    const expectdMonthShort = date.toLocaleString('En-US',{month:'short'})
    const expectdMonthLong = date.toLocaleString('En-US',{month:'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectdMonthShort} ${expecteddate}, ${expectedYear}`
    const expectedMonthAndYear = `${expectdMonthLong} ${expectedYear}`

    const formPicker = await page.getByPlaceholder('Form Picker')
    await formPicker.click()
    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
      const nextButton = await page.locator('nb-calendar-pageable-navigation').getByRole('button').nth(1)
      await nextButton.click()
      calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    const dataChoice = await page.locator('nb-calendar-picker').getByText(expecteddate,{exact:true})
    await dataChoice.click()
    await expect(formPicker).toHaveValue(dateToAssert)
  })
})


test('slides', async({page}) =>{
  const tembox = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tembox.scrollIntoViewIfNeeded()
  const box = await tembox.boundingBox()
  const x= box.x+box.width/2
  const y= box.y+box.height/2
  await page.mouse.move(x,y)
  await page.mouse.down()
  await page.mouse.move(x+100,y)
  await page.mouse.move(x+100,y+100)
  await page.mouse.up()
  await expect(tembox).toContainText('30')
})
