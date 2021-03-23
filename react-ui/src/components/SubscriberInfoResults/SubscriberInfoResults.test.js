import React from 'react'
import { render, logRoles, fireEvent, screen, getRoles, prettyDOM, logDOM } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import SubscriberInfoResults from './SubscriberInfoResults'
import userEvent from '@testing-library/user-event'

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
      }
    }
  ],
  _persist: {
    version: -1,
    rehydrated: true
  }
}

let stateWithTwoSuccessfulSubscriberResults = {
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
          },
          {
            Client: {
              ID: '523005765'
            },
            PartnerKey: '',
            CreatedDate: '2021-01-28T10:13:00',
            ID: '1285378833',
            ObjectID: '',
            EmailAddress: 'balwill@bu.edu',
            Attributes: [
              {
                Name: 'First Name',
                Value: 'Test'
              },
              {
                Name: 'Last Name',
                Value: 'Record'
              }
            ],
            SubscriberKey: 'testSubKey',
            Status: 'Active'
          }
        ],
      }
    }
  ],
  _persist: {
    version: -1,
    rehydrated: true
  }
} 

let stateWithNoSubscriberResults = {
  input: 'balwill0503@gmail.com',
  inputSubmitted: 'balwill0503@gmail.com',
  currentJobId: '45',
  error: {},
  findSubscriberJobs: [
    {
      id: '45',
      timeSubmitted: '2021-03-23T16:09:53.835Z',
      inputSubmitted: 'balwill0503@gmail.com',
      state: 'completed',
      progress: 0,
      result: {
        subscriberInfo: [],
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
                _ContactKey: '0034S000002WAEyQAO',
                AccountId: '',
                Age__c: '',
                Birthdate: '',
                Channel_Preferences__c: '',
                CreatedById: '0054S000000MwxpQAC',
                Email: 'balwill0503@gmail.com',
                FirstName: 'FinalTest',
                HasOptedOutOfEmail: 'False',
                Id: '0034S000002WAEyQAO',
                IndividualId: '',
                Language_Preference__c: '',
                Languages__c: '',
                LastModifiedById: '0054S000000MwxpQAC',
                LastModifiedDate: '11/10/2020 11:23:52 PM',
                LastName: 'PleaseWork',
                MasterRecordId: '',
                Medicaid_Plan__c: '',
                Medicare_Plan__c: '',
                OwnerId: '0054S000000MwxpQAC',
                Pharmacy_Plan__c: '',
                ReportsToId: '',
                SDR_Person_ID__c: 'H10000080'
              }
            ],
            folderPath: 'Synchronized Data Extensions'
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

test('Renders without crashing', () => {
  render(<SubscriberInfoResults />, {initialState: stateWithSuccessfulResult})
  
  const subscriberInfoResultComponent = screen.getByTestId('subscriberInfoResults')

  expect(subscriberInfoResultComponent).toBeInTheDocument()
})

test('Renders summary message and table correctly when 1 result is returned', () => {
  render(<SubscriberInfoResults />, {initialState: stateWithSuccessfulResult})
  
  const summaryMessage = screen.getByText('1 Subscriber was found in the All Subscribers List')
  const columnHeaderRow = screen.getByRole('row', {name: "Subscriber Key Email Address Subscriber ID Created Date Status"})
  const subscriberInfoRow = screen.getByRole('row', {name: "00Q4S000002CsSdUAK balwill@bu.edu 1285378832 2021-01-28T10:13:00 Active"})

  expect(summaryMessage).toBeInTheDocument()
  expect(columnHeaderRow).toBeInTheDocument()
  expect(subscriberInfoRow).toBeInTheDocument()
})

test('Renders summary message and table correctly when > 1 result is returned', () => {
  render(<SubscriberInfoResults />, {initialState: stateWithTwoSuccessfulSubscriberResults})

  const summaryMessage = screen.getByText('2 Subscribers were found in the All Subscribers List')
  const columnHeaderRow = screen.getByRole('row', {name: "Subscriber Key Email Address Subscriber ID Created Date Status"})
  const subscriberInfoRow_1 = screen.getByRole('row', {name: "00Q4S000002CsSdUAK balwill@bu.edu 1285378832 2021-01-28T10:13:00 Active"})
  const subscriberInfoRow_2 = screen.getByRole('row', {name: "testSubKey balwill@bu.edu 1285378833 2021-01-28T10:13:00 Active"})

  expect(summaryMessage).toBeInTheDocument()
  expect(columnHeaderRow).toBeInTheDocument()
  expect(subscriberInfoRow_1).toBeInTheDocument()
  expect(subscriberInfoRow_2).toBeInTheDocument()
})

test('Renders summary message correctly and no table when 0 results are returned (for subscriber info)', () => {
  render(<SubscriberInfoResults />, {initialState: stateWithNoSubscriberResults})

  const summaryMessage = screen.getByText('No Subscribers were found in the All Subscribers List')
  const table = screen.queryByRole('table')

  expect(summaryMessage).toBeInTheDocument()
  expect(table).not.toBeInTheDocument()
})

