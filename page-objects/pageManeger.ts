import {Page} from '@playwright/test'
import {NaviagationPage} from "../page-objects/naviagationPage";
import {FormLayoutsPage} from "../page-objects/formLayoutsPage";
import {DatePickerPage} from "../page-objects/datePickerPage";

export class PageManeger{
  private readonly page:Page;
  private readonly naviagetionPage:NaviagationPage;
  private readonly formLayoutsPage:FormLayoutsPage;
  private readonly datePickerPage:DatePickerPage;

  constructor(page:Page) {
    this.page = page;
    this.naviagetionPage = new NaviagationPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
    this.datePickerPage = new DatePickerPage(this.page);

  }

  naviagteTo(){
    return this.naviagetionPage
  }

  onFormLayouts(){
    return this.formLayoutsPage
  }

  onDatePicker(){
    return this.datePickerPage
  }

}

