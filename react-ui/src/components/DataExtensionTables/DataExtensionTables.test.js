import React from 'react'
import { render, logRoles, fireEvent, screen, getRoles, prettyDOM } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import DataExtensionTables from './DataExtensionTables'
import initialState from '../../stateManagement/initialState'


// Sample state used for tests
let state = {
  input: 'balwill@bu.edu',
  inputSubmitted: 'balwill@bu.edu',
  currentJobId: '38',
  error: {},
  findSubscriberJobs: [
    {
      id: '38',
      timeSubmitted: '2021-03-19T17:14:25.918Z',
      inputSubmitted: 'balwill@bu.edu',
      state: 'completed',
      progress: 0,
      result: {
        subscriberInfo: [
          {
            Client: {
              ID: '523005765'
            },
            PartnerKey: '',
            CreatedDate: '2021-01-28T10:13:00',
            ID: '1285378832',
            ObjectID: '',
            EmailAddress: 'balwill@bu.edu',
            Attributes: [
              {
                Name: 'First Name',
                Value: 'Brian'
              },
              {
                Name: 'Last Name',
                Value: 'Alwill'
              }
            ],
            SubscriberKey: '00Q4S000002CsSdUAK',
            Status: 'Active'
          }
        ],
        dataExtensionResults: [
          {
            dataExtension: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-01-28T09:51:52.33',
              ModifiedDate: '2021-01-28T09:51:52.33',
              ObjectID: '915f39bb-8061-eb11-a2f1-1402ec938de9',
              CustomerKey: 'Contact_Salesforce',
              IsPlatformObject: 'false',
              Name: 'Contact_Salesforce',
              Description: '',
              IsSendable: 'true',
              IsTestable: 'true',
              SendableDataExtensionField: {
                PartnerKey: '',
                ObjectID: '',
                Name: '_ContactKey'
              },
              SendableSubscriberField: {
                Name: '_SubscriberKey'
              },
              DataRetentionPeriodUnitOfMeasure: '0',
              RowBasedRetention: 'false',
              ResetRetentionPeriodOnImport: 'false',
              DeleteAtEndOfRetentionPeriod: 'false',
              RetainUntil: '',
              CategoryID: '1693962',
              Status: 'None'
            },
            column: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-01-28T09:51:52.33',
              ModifiedDate: '2021-01-28T09:51:52.33',
              ObjectID: '985f39bb-8061-eb11-a2f1-1402ec938de9',
              CustomerKey: '[Contact_Salesforce].[Email]',
              Name: 'Email',
              Scale: '0',
              DefaultValue: '',
              MaxLength: '80',
              IsRequired: 'false',
              Ordinal: '7',
              IsPrimaryKey: 'false',
              FieldType: 'EmailAddress'
            },
            matchingRows: [
              {
                _ContactKey: '0034S000002WqCmQAK',
                AccountId: '',
                Age__c: '',
                Birthdate: '',
                Channel_Preferences__c: '',
                CreatedById: '0054S000000MwxpQAC',
                Email: 'balwill@bu.edu',
                FirstName: 'Brian',
                HasOptedOutOfEmail: 'False',
                Id: '0034S000002WqCmQAK',
                IndividualId: '0PK4S0000004XTOWA2',
                Language_Preference__c: '',
                Languages__c: '',
                LastModifiedById: '0054S000000MwxpQAC',
                LastModifiedDate: '2/2/2021 10:11:19 AM',
                LastName: 'Alwill',
                MasterRecordId: '',
                Medicaid_Plan__c: '',
                Medicare_Plan__c: 'a0N4S0000000b3iUAA',
                OwnerId: '0054S000000MwxpQAC',
                Pharmacy_Plan__c: '',
                ReportsToId: '',
                SDR_Person_ID__c: 'H10000089'
              }
            ],
            folderPath: 'Synchronized Data Extensions'
          },
          {
            dataExtension: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-01-28T09:53:53.473',
              ModifiedDate: '2021-01-28T09:53:53.473',
              ObjectID: 'b1983d04-8161-eb11-a2f1-1402ec938de9',
              CustomerKey: 'Lead_Salesforce',
              IsPlatformObject: 'false',
              Name: 'Lead_Salesforce',
              Description: '',
              IsSendable: 'true',
              IsTestable: 'true',
              SendableDataExtensionField: {
                PartnerKey: '',
                ObjectID: '',
                Name: '_ContactKey'
              },
              SendableSubscriberField: {
                Name: '_SubscriberKey'
              },
              DataRetentionPeriodUnitOfMeasure: '0',
              RowBasedRetention: 'false',
              ResetRetentionPeriodOnImport: 'false',
              DeleteAtEndOfRetentionPeriod: 'false',
              RetainUntil: '',
              CategoryID: '1693962',
              Status: 'None'
            },
            column: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-01-28T09:53:53.473',
              ModifiedDate: '2021-01-28T09:53:53.473',
              ObjectID: 'b8983d04-8161-eb11-a2f1-1402ec938de9',
              CustomerKey: '[Lead_Salesforce].[Email]',
              Name: 'Email',
              Scale: '0',
              DefaultValue: '',
              MaxLength: '80',
              IsRequired: 'false',
              Ordinal: '7',
              IsPrimaryKey: 'false',
              FieldType: 'EmailAddress'
            },
            matchingRows: [
              {
                _ContactKey: '00Q4S000002CsSdUAK',
                ConvertedAccountId: '',
                ConvertedContactId: '',
                ConvertedOpportunityId: '',
                CreatedById: '0054S000000MwxpQAC',
                DandbCompanyId: '',
                Email: 'balwill@bu.edu',
                FirstName: 'Brian',
                HasOptedOutOfEmail: 'False',
                Id: '00Q4S000002CsSdUAK',
                IndividualId: '',
                IsConverted: 'False',
                IsDeleted: 'False',
                LastModifiedById: '0054S000000MwxpQAC',
                LastName: 'Alwill',
                MasterRecordId: '',
                MobilePhone: '',
                OwnerId: '0054S000000MwxpQAC',
                Phone: '7327716548',
                Status: 'Open - Not Contacted'
              }
            ],
            folderPath: 'Synchronized Data Extensions'
          },
          {
            dataExtension: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-02-02T10:32:38.463',
              ModifiedDate: '2021-02-02T10:32:38.463',
              ObjectID: 'a0b3e33d-7465-eb11-a2f1-1402ec938de9',
              CustomerKey: 'ContactPointEmail_Salesforce',
              IsPlatformObject: 'false',
              Name: 'ContactPointEmail_Salesforce',
              Description: '',
              IsSendable: 'false',
              IsTestable: 'false',
              DataRetentionPeriodUnitOfMeasure: '0',
              RowBasedRetention: 'false',
              ResetRetentionPeriodOnImport: 'false',
              DeleteAtEndOfRetentionPeriod: 'false',
              RetainUntil: '',
              CategoryID: '1693962',
              Status: 'None'
            },
            column: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-02-02T10:32:38.463',
              ModifiedDate: '2021-02-02T10:32:38.463',
              ObjectID: 'a2b3e33d-7465-eb11-a2f1-1402ec938de9',
              CustomerKey: '[ContactPointEmail_Salesforce].[EmailAddress]',
              Name: 'EmailAddress',
              Scale: '0',
              DefaultValue: '',
              MaxLength: '80',
              IsRequired: 'false',
              Ordinal: '2',
              IsPrimaryKey: 'false',
              FieldType: 'EmailAddress'
            },
            matchingRows: [
              {
                CreatedById: '0054S000000MwxpQAC',
                EmailAddress: 'balwill@bu.edu',
                EmailDomain: '',
                EmailLatestBounceDateTime: '',
                EmailLatestBounceReasonText: '',
                Id: '9Vl4S0000008OI5SAM',
                IsPrimary: 'True',
                LastModifiedById: '0054S000000MwxpQAC',
                Name: 'balwill@bu.edu',
                OwnerId: '0054S000000MwxpQAC',
                ParentId: '0PK4S0000004XTOWA2'
              }
            ],
            folderPath: 'Synchronized Data Extensions'
          },
          {
            dataExtension: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-02-03T08:04:40.913',
              ModifiedDate: '2021-02-03T08:44:01.07',
              ObjectID: '7472e6be-2866-eb11-a2f1-1402ec938de9',
              CustomerKey: '521E2B13-3213-4C9E-970B-DB1B3729E902',
              IsPlatformObject: 'false',
              Name: 'Subscriber',
              Description: '',
              IsSendable: 'false',
              IsTestable: 'false',
              RowBasedRetention: 'false',
              ResetRetentionPeriodOnImport: 'false',
              DeleteAtEndOfRetentionPeriod: 'false',
              RetainUntil: '',
              CategoryID: '1695723',
              Status: 'None'
            },
            column: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-02-03T08:04:40.96',
              ModifiedDate: '2021-02-03T08:44:01.087',
              ObjectID: '8681220c-e642-4eef-acd2-8286666df621',
              CustomerKey: '[521E2B13-3213-4C9E-970B-DB1B3729E902].[EmailAddress]',
              Name: 'EmailAddress',
              Scale: '0',
              DefaultValue: '',
              MaxLength: '254',
              IsRequired: 'true',
              Ordinal: '5',
              IsPrimaryKey: 'false',
              FieldType: 'EmailAddress'
            },
            matchingRows: [
              {
                DateUndeliverable: '',
                DateJoined: '1/28/2021 10:13:00 AM',
                BounceCount: '0',
                SubscriberID: '1285378832',
                Status: 'active',
                SubscriberKey: '00Q4S000002CsSdUAK',
                EmailAddress: 'balwill@bu.edu',
                Locale: '',
                DateUnsubscribed: '',
                Domain: 'bu.edu',
                SubscriberType: 'ExactTarget'
              }
            ],
            folderPath: 'Data Extensions > 0 - System > 0.1 - Dataviews > 0.1.3 - System'
          },
          {
            dataExtension: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-02-17T09:21:17.017',
              ModifiedDate: '2021-02-17T09:21:17.017',
              ObjectID: 'a2b0a9c3-3371-eb11-a2f1-1402ec938de9',
              CustomerKey: '19CA0B65-AF3E-4401-B6EE-8C3CB345C171',
              IsPlatformObject: 'false',
              Name: 'POC Seedlist',
              Description: '',
              IsSendable: 'true',
              IsTestable: 'false',
              SendableDataExtensionField: {
                PartnerKey: '',
                ObjectID: '',
                Name: 'subscriberKey'
              },
              SendableSubscriberField: {
                Name: '_SubscriberKey'
              },
              RowBasedRetention: 'false',
              ResetRetentionPeriodOnImport: 'false',
              DeleteAtEndOfRetentionPeriod: 'false',
              RetainUntil: '',
              CategoryID: '1707614',
              Status: 'None'
            },
            column: {
              Client: {
                ID: '523005765'
              },
              PartnerKey: '',
              CreatedDate: '2021-02-17T09:21:17.08',
              ModifiedDate: '2021-02-17T09:21:17.08',
              ObjectID: '66c474d2-1d8c-4862-8eaf-c5b39168f2bc',
              CustomerKey: '[19CA0B65-AF3E-4401-B6EE-8C3CB345C171].[email]',
              Name: 'email',
              Scale: '0',
              DefaultValue: '',
              MaxLength: '254',
              IsRequired: 'true',
              Ordinal: '1',
              IsPrimaryKey: 'false',
              FieldType: 'EmailAddress'
            },
            matchingRows: [
              {
                subscriberKey: '00Q4S000002CsSdUAK',
                lastName: 'Alwill',
                firstName: 'Brian',
                email: 'balwill@bu.edu'
              },
              {
                subscriberKey: 'testRecord',
                lastName: 'Record',
                firstName: 'Test',
                email: 'balwill@bu.edu'
              }
            ],
            folderPath: 'Data Extensions > 2 - Campaigns > 2.3 - POC'
          }
        ]
      }
    }
  ],
  _persist: {
    version: -1,
    rehydrated: true
  }
}

test('Renders DE Results Message', () => {
  render(<DataExtensionTables />, { initialState: state })

  const deResultMessage = screen.getByText('Your Subscriber was found in 5 Data Extensions')
  
  expect(deResultMessage).toBeInTheDocument()
})

test('Renders a title for each DE table result', () => {
  render(<DataExtensionTables />, { initialState: state })

  const firstTableTitle = screen.getByRole('heading', {name: 'Contact_Salesforce'})
  const secondTableTitle = screen.getByRole('heading', {name: 'Lead_Salesforce'})
  const thirdTableTitle = screen.getByRole('heading', {name: 'ContactPointEmail_Salesforce'})
  const fourthTableTitle = screen.getByRole('heading', {name: 'Subscriber'})
  const fifthTableTitle = screen.getByRole('heading', {name: 'POC Seedlist'})

  expect(firstTableTitle).toBeInTheDocument()
  expect(secondTableTitle).toBeInTheDocument()
  expect(thirdTableTitle).toBeInTheDocument()
  expect(fourthTableTitle).toBeInTheDocument()
  expect(fifthTableTitle).toBeInTheDocument()
})

test('Renders folder path for each DE table result', () => {
  const deTables = render(<DataExtensionTables />, { initialState: state })

  // the 1st, 2nd, and 3rd tables have the same folder path
  const firstSecondThirdTableFolderPath = screen.getAllByText('Synchronized Data Extensions').length
  const fourthTableFolderPath = screen.getByText('Data Extensions > 0 - System > 0.1 - Dataviews > 0.1.3 - System')
  const fifthTableFolderPath = screen.getByText('Data Extensions > 2 - Campaigns > 2.3 - POC')

  // For 'firstSecondThirdFolderPath' we're evaluating length since the first 3 results have the same path 
  expect(firstSecondThirdTableFolderPath).toBe(3)
  expect(fourthTableFolderPath).toBeInTheDocument()
  expect(fifthTableFolderPath).toBeInTheDocument()
})

test('Renders all DE columns and rows', () => {
  render(<DataExtensionTables />, { initialState: state })
  
  const deResults = screen.getByTestId('data-extension-results-section')

  const firstTableColumnHeaders = screen.getByRole('row', {name: "_ContactKey AccountId Age__c Birthdate Channel_Preferences__c CreatedById Email FirstName HasOptedOutOfEmail Id IndividualId Language_Preference__c Languages__c LastModifiedById LastModifiedDate LastName MasterRecordId Medicaid_Plan__c Medicare_Plan__c OwnerId Pharmacy_Plan__c ReportsToId SDR_Person_ID__c"})
  const firstTableRows_1 = screen.getByRole('row', {name: "0034S000002WqCmQAK 0054S000000MwxpQAC balwill@bu.edu Brian False 0034S000002WqCmQAK 0PK4S0000004XTOWA2 0054S000000MwxpQAC 2/2/2021 10:11:19 AM Alwill a0N4S0000000b3iUAA 0054S000000MwxpQAC H10000089"})

  const secondTableColumnHeaders = screen.getByRole('row', {name: "_ContactKey ConvertedAccountId ConvertedContactId ConvertedOpportunityId CreatedById DandbCompanyId Email FirstName HasOptedOutOfEmail Id IndividualId IsConverted IsDeleted LastModifiedById LastName MasterRecordId MobilePhone OwnerId Phone Status"})
  const secondTableRows_1 = screen.getByRole('row', {name: "00Q4S000002CsSdUAK 0054S000000MwxpQAC balwill@bu.edu Brian False 00Q4S000002CsSdUAK False False 0054S000000MwxpQAC Alwill 0054S000000MwxpQAC 7327716548 Open - Not Contacted"})

  const thirdTableColumnHeaders = screen.getByRole('row', {name: "CreatedById EmailAddress EmailDomain EmailLatestBounceDateTime EmailLatestBounceReasonText Id IsPrimary LastModifiedById Name OwnerId ParentId"})
  const thirdTableRows_1 = screen.getByRole('row', {name: "0054S000000MwxpQAC balwill@bu.edu 9Vl4S0000008OI5SAM True 0054S000000MwxpQAC balwill@bu.edu 0054S000000MwxpQAC 0PK4S0000004XTOWA2"})

  const fourthTableColumnHeaders = screen.getByRole('row', {name: "DateUndeliverable DateJoined BounceCount SubscriberID Status SubscriberKey EmailAddress Locale DateUnsubscribed Domain SubscriberType"})
  const fourthTableRows_1 = screen.getByRole('row', {name: "1/28/2021 10:13:00 AM 0 1285378832 active 00Q4S000002CsSdUAK balwill@bu.edu bu.edu ExactTarget"})

  const fifthTableColumnHeaders = screen.getByRole('row', {name: "subscriberKey lastName firstName email"})
  const fifthTableRows_1 = screen.getByRole('row', {name: "00Q4S000002CsSdUAK Alwill Brian balwill@bu.edu"})
  const fifthTableRows_2 = screen.getByRole('row', {name: "testRecord Record Test balwill@bu.edu"})

  // confirm first table header + rows render
  expect(firstTableColumnHeaders).toBeInTheDocument()
  expect(firstTableRows_1).toBeInTheDocument()
  
  // confirm second table header + rows render
  expect(secondTableColumnHeaders).toBeInTheDocument()
  expect(secondTableRows_1).toBeInTheDocument()

  // confirm third table header + rows render
  expect(thirdTableColumnHeaders).toBeInTheDocument()
  expect(thirdTableRows_1).toBeInTheDocument()

  // confirm fourth table header + rows render
  expect(fourthTableColumnHeaders).toBeInTheDocument()
  expect(fourthTableRows_1).toBeInTheDocument()

  // confirm fifth table header + rows render
  expect(fifthTableColumnHeaders).toBeInTheDocument()
  expect(fifthTableRows_1).toBeInTheDocument()
  expect(fifthTableRows_2).toBeInTheDocument()
})

test('Renders icons for each DE table', () => {
  render(<DataExtensionTables />, { initialState: state })

  // checks the length of deIcons rendered...should be 5
  const fiveDeIcons = screen.getAllByText('deIcon').length

  expect(fiveDeIcons).toBe(5)
})
