import React from 'react'
import { render, logRoles, fireEvent, screen, getRoles, prettyDOM, logDOM } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import SearchHistory from './SearchHistory'
import initialState from '../../stateManagement/initialState'
import userEvent from '@testing-library/user-event'

let stateWithProcessingJob = {
  input: 'balwill@bu.edu',
  inputSubmitted: 'balwill@bu.edu',
  currentJobId: '39',
  error: {},
  findSubscriberJobs: [
    {
      id: '39',
      timeSubmitted: '2021-03-22T19:07:39.155Z',
      inputSubmitted: 'balwill@bu.edu',
      state: 'active'
    }
  ],
  _persist: {
    version: -1,
    rehydrated: true
  }
}

let stateWithSuccessfulResult = {
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

test('Renders empty <SearchHistory /> on initial state', () => {
  render(<SearchHistory />, initialState)

  const searchHistoryComponent = screen.getByTestId('searchHistory')
  const searchHistoryTitle = screen.getByText('Search History')
  const itemCount = screen.getByText('0 item')
  const searchHistoryList = screen.getByRole('listbox', {name: 'Select an item to view the details'})
  
  expect(searchHistoryComponent).toBeInTheDocument()
  expect(searchHistoryTitle).toBeInTheDocument()
  expect(itemCount).toBeInTheDocument()
  expect(searchHistoryList).toBeEmptyDOMElement()
})

test('Renders search details correctly when processing job', () => {
  render(<SearchHistory />, {initialState: stateWithProcessingJob})

  const itemCount = screen.getByText('1 item')
  const searchHistoryList = screen.getByRole('listbox', {name: 'Select an item to view the details'})
  const listItems = screen.getAllByRole('presentation')
  const listItemDetails = screen.getByRole('option', {name: 'balwill@bu.edu Active Data Extension Results: Pending Data Extension Results: Pending'})

  expect(itemCount).toBeInTheDocument()
  expect(searchHistoryList).not.toBeEmptyDOMElement()
  expect(listItems.length).toBe(1)
  expect(listItemDetails).toBeInTheDocument()
})

test('Renders search details correctly when job is completed', () => {
  render(<SearchHistory />, {initialState: stateWithSuccessfulResult})

  const searchHistoryComponent = screen.getByTestId('searchHistory')

  const itemCount = screen.getByText('1 item')
  const searchHistoryList = screen.getByRole('listbox', {name: 'Select an item to view the details'})
  const listItems = screen.getAllByRole('presentation')
  const listItemDetails = screen.getByRole('option', {name: 'balwill@bu.edu Completed Data Extension Results: 5 Data Extension Results: 5'})

  expect(itemCount).toBeInTheDocument()
  expect(searchHistoryList).not.toBeEmptyDOMElement()
  expect(listItems.length).toBe(1)
  expect(listItemDetails).toBeInTheDocument()
})