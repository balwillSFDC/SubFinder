// ==============================================================
// SETUP
// ==============================================================

// Require Marketing Cloud Packages + Parameters
const env = require('dotenv').config();
const ET_Client = require('sfmc-fuelsdk-node');
const clientId = process.env.REACT_APP_SFMC_CLIENTID;
const clientSecret = process.env.REACT_APP_SFMC_CLIENTSECRET;
const stack = process.env.REACT_APP_SFMC_STACK;
const origin = process.env.REACT_APP_SFMC_ORIGIN;
const authOrigin = process.env.REACT_APP_SFMC_AUTHORIGIN;
const soapOrigin = process.env.REACT_APP_SFMC_SOAPORIGIN;
const parentBU = process.env.REACT_APP_SFMC_PARENT;

// Instantiating Node Class
const sfmcNode = new ET_Client(clientId, clientSecret, stack, {
    origin,
    authOrigin,
    soapOrigin,
    authOptions: {
      authVersion: 2,
      // accountId: parentBU,
      applicationType: 'Server',
    }
  });

// console.log(sfmcNode)

// ==============================================================
// DEBUG
// ==============================================================

  let debug = true;
  
  let sampleDataExtensionObj = {
    Client: { ID: '523005765' },
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
    SendableSubscriberField: { Name: '_SubscriberKey' },
    DataRetentionPeriodUnitOfMeasure: '0',
    RowBasedRetention: 'false',
    ResetRetentionPeriodOnImport: 'false',
    DeleteAtEndOfRetentionPeriod: 'false',
    RetainUntil: '',
    CategoryID: '1693962',
    Status: 'None'
  };
  
  let sampleDataExtensionObj2 = {
    Client: { ID: '523005765' },
    PartnerKey: '',
    CreatedDate: '2021-02-08T12:39:07.5',
    ModifiedDate: '2021-02-08T12:45:00.447',
    ObjectID: 'b1b59aeb-3c6a-eb11-a2f1-1402ec938de9',
    CustomerKey: '324C7C3C-7EDB-4EE9-B46F-72E20FC6FEBD',
    IsPlatformObject: 'false',
    Name: '2_1_1_Master_SMS',
    Description: '',
    IsSendable: 'false',
    IsTestable: 'false',
    RowBasedRetention: 'false',
    ResetRetentionPeriodOnImport: 'false',
    DeleteAtEndOfRetentionPeriod: 'false',
    RetainUntil: '',
    CategoryID: '1697783',
    Status: 'None'
  };
  
  let sampleEmailColumn = {
    Client: { ID: '523005765' },
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
  };
  
  if (debug === true) {
    console.log('RESULTS START HERE:');

  }
  
// // CODE THAT HELPS YOU SEE WHAT PROPERTIES ARE RETRIEVABLE IN API OBJECT
// sfmcSoap.describe('BusinessUnit', (err, response) => {
//     let properties = response.body.ObjectDefinition.Properties
//     let propertyArray = [];
//     properties.forEach(property => {
//         if (property.IsRetrievable == 'true') {
//             propertyArray.push(property.Name)
//         }
//     })

//     console.log(propertyArray)
// })

// ==============================================================
// FUNCTIONS
// ==============================================================

function getAllDataExtensions() {
    var options = {
        props: [
        'ObjectID',
        'PartnerKey',
        'CustomerKey',
        'Name',
        'CreatedDate',
        'ModifiedDate',
        'Client.ID',
        'Description',
        'IsSendable',
        'IsTestable',
        'SendableDataExtensionField.Name',
        'SendableSubscriberField.Name',
        'Template.CustomerKey',
        'CategoryID',
        'Status',
        'IsPlatformObject',
        'DataRetentionPeriodLength',
        'DataRetentionPeriodUnitOfMeasure',
        'RowBasedRetention',
        'ResetRetentionPeriodOnImport',
        'DeleteAtEndOfRetentionPeriod',
        'RetainUntil',
        'DataRetentionPeriod'
        ],
        filter: {
        leftOperand: 'Client.ID',
        operator: 'isNotNull',
        rightOperand: ''
        }
    };

    const de = sfmcNode.dataExtension(options);

    let dataExtensionsResult = new Promise((resolve, reject) => {
        de.get((err, res) => {
        if (err) console.log(err);
        if (res) resolve(res.body.Results);
        });
    });

    return dataExtensionsResult;
}
  
function getAllDataExtensionColumns(dataExtensionObject) {
    var options = {
        props: [
        'ObjectID',
        'PartnerKey',
        'Name',
        'DefaultValue',
        'MaxLength',
        'IsRequired',
        'Ordinal',
        'IsPrimaryKey',
        'FieldType',
        'CreatedDate',
        'ModifiedDate',
        'Scale',
        'Client.ID',
        'CustomerKey'
        ],
        filter: {
        leftOperand: 'DataExtension.CustomerKey',
        operator: 'equals',
        rightOperand: dataExtensionObject.CustomerKey
        }
    };

    let deColumn = sfmcNode.dataExtensionColumn(options);

    const allDataExtensionColumns = new Promise((resolve, reject) => {
        deColumn.get((err, res) => {
        if (err) reject(err);
        if (res) resolve(res.body.Results);
        });
    });

    return allDataExtensionColumns;
}
  
async function getMatchingDataExtensionRows(dataExtensionObject, columnName, valueToMatch) {
  let dataExtensionColumnNames = [];
  let dataExtensionColumns = await getAllDataExtensionColumns(dataExtensionObject);

  for (let column of dataExtensionColumns) {
    dataExtensionColumnNames.push(column.Name);
  }

  let options = {
    Name: dataExtensionObject.CustomerKey,
    props: dataExtensionColumnNames,
    filter: {
      leftOperand: columnName,
      operator: 'equals',
      rightOperand: valueToMatch
    }
  };
  
    let deRow = sfmcNode.dataExtensionRow(options);
  
    let matchingDataExtensionRows = new Promise((resolve, reject) => {
      deRow.get((err, res) => {
        if (err) {
          reject(err);
        } else {
          let results = res.body.Results;
          let rows = [];

          results.forEach((result) => {
            // SFMC returns the results in an array of Key/Value Obj pairs, like this [{Name:Name, Value:Value}]
            let arrayOfNameValuePairs = result.Properties.Property

            // ...Because that's dumb, we flatten it into a single obj, like so {Name: Value}
            let flattenedObj = arrayOfNameValuePairs.reduce(
              ( obj, item ) => Object.assign(obj, {[item.Name]: item.Value}),
              {}
            )

            // ...And push the result into the rows array
            rows.push(flattenedObj);
          }) 
          resolve(rows);
        }
      });
    });
  
    return matchingDataExtensionRows;
}
  
function getFolder(categoryId) {
  var options = {
    props: [
      'ID',
      'Client.ID',
      'ParentFolder.ID',
      'ParentFolder.CustomerKey',
      'ParentFolder.ObjectID',
      'ParentFolder.Name',
      'ParentFolder.Description',
      'ParentFolder.ContentType',
      'ParentFolder.IsActive',
      'ParentFolder.IsEditable',
      'ParentFolder.AllowChildren',
      'Name',
      'Description',
      'ContentType',
      'IsActive',
      'IsEditable',
      'AllowChildren',
      'CreatedDate',
      'ModifiedDate',
      'Client.ModifiedBy',
      'ObjectID',
      'CustomerKey'
    ],
    filter: {
      leftOperand: 'ID',
      operator: 'equals',
      rightOperand: categoryId
    }
  };

  let folder = sfmcNode.folder(options);

  let folderData = new Promise((resolve, reject) => {
    folder.get((err, res) => {
      if (err) {
        reject(console.log(err));
      }
      if (res) {
        resolve(res.body.Results[0]);
      }
    });
  });

  return folderData;
}
  
async function getFolderPath(categoryId) {
  let folderHierarchy = [];
  let parentFolder;

  do {
    let folder = await getFolder(categoryId);
    folderHierarchy.unshift(folder.Name);
    parentFolder = folder.ParentFolder;

    if (parentFolder.Name) {
      categoryId = parentFolder.ID;
    } else {
      parentFolder = '';
    }
  } while (parentFolder);

  let folderPath = folderHierarchy.join(' > ');

  // returns string 'A > B > C'
  return folderPath;
}

async function findSubscriber(input) {
  // 1. If input contains '@' assume inputType = Email, otherwise assume input is a SubscriberKey (i.e. inputType = Text)
  // 2. If inputType = Email, for each data extension, search if there's a column name where fieldType = 'Email'
  // 3. If there's an Email field in a data extension, try to retrieve rows based on that field using the given input
  // 4. If results are found, return the rows

  let inputType = input.includes('@') ? 'Email' : 'Text';
  let allDataExtensions = await getAllDataExtensions();

  let results = [];

  if (inputType === 'Email') {
    for (const dataExtension of allDataExtensions) {
      let deColumns = await getAllDataExtensionColumns(dataExtension);

      for (const column of deColumns) {
        if (column.FieldType === 'EmailAddress') {
          let matchingRows = await getMatchingDataExtensionRows(
            dataExtension,
            column.Name,
            input
          );
          if (matchingRows.length > 0) {
            let folderPath = await getFolderPath(dataExtension.CategoryID)

            results.push({ dataExtension, column, matchingRows, folderPath });
          }             
        }
      }
    }
  } 
  return results;
}


  findSubscriber('balwill@Bu.edu').then(console.log)



module.exports = {
  findSubscriber
}