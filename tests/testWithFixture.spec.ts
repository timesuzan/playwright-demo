import {test} from '../test-options'

import {faker} from '@faker-js/faker'





test('parameterize methods', async ({pageManager})=>{

  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@tester.com`


  await pageManager.onFormLayouts().submitUsingTheGridFrom(process.env.EMAIL,process.env.PASSWORD,'Option 1')
  await pageManager.onFormLayouts().submitInlineFrom(randomFullName,randomEmail,true)


})
