import * as SQLite from "expo-sqlite/legacy";
const db = SQLite.openDatabase("flood.db");

export const createTable = (tableName, columns) => {
  const columnsString = columns.map(column => `${column.name} ${column.type} ${column.constrain}`).join(', ');
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsString});`;
  db.transaction(tx => {
    tx.executeSql(
      query,
      [],
      () => console.log(`Table '${tableName}' created successfully.`),
      (txObj, error) => console.log(`Error creating table '${tableName}': ${error.message}`)
    );
  });
};

export const deleteFromTable = (tableName, condition, params) => {
  const query = `DELETE FROM ${tableName} WHERE ${condition};`;

  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          params,
          (_, result) => {
            // Check the number of affected rows to determine success
            const rowsAffected = result.rowsAffected;
            console.log(rowsAffected, tableName)
            resolve(rowsAffected > 0); // Resolve true if rows were deleted, otherwise false
          },
          (txObj, error) => {
            console.log(`Error deleting rows from '${tableName}': ${error.message}`);
            reject(error);
          }
        );
      },
      (error) => {
        console.log(`Transaction error: ${error.message}`);
        reject(error);
      }
    );
  });
};

export const dropTable = (tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;

  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          query, 
          [], // Empty array since `DROP TABLE` doesn't require query parameters
          (_, result) => {
            const rowsAffected = result.rowsAffected;
            console.log(rowsAffected, `${tableName} table dropped`);
            resolve(rowsAffected > 0); // Resolve true if the table was dropped
          },
          (txObj, error) => {
            // Error callback
            console.log(`Error dropping table '${tableName}': ${error.message}`);
            reject(error); // Reject with error
            return true; // Important: returning true to signal the error handler
          }
        );
      },
      (error) => {
        // Transaction error
        console.log(`Transaction error: ${error.message}`);
        reject(error);
      }
    );
  });
};





export const InsertData = (tableName, data) => {
  const columnNames = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);
  const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders});`;

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          values,
          (_, resultSet) => {
            console.log(`Data inserted into '${tableName}' successfully.`);
            resolve(resultSet);
          },
          (txObj, error) => {
            console.error(`Error inserting data into '${tableName}': ${error.message}`);
            reject(error);
          }
        );
      },
      (error) => {
        console.error(`Error executing transaction on '${tableName}':`, error);
        reject(error);
      }
    );
  });
};



export const selectData = (tableName) => {
  // Query to check if the table exists
  const checkTableQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`;

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // Check if the table exists
        tx.executeSql(
          checkTableQuery,
          [],
          (_, resultSet) => {
            const results = resultSet.rows;
            if (results.length > 0) {
              // Table exists, execute the SELECT query
              const selectQuery = `SELECT * FROM ${tableName};`;
              tx.executeSql(
                selectQuery,
                [],
                (_, resultSet) => {
                  const data = [];
                  const results = resultSet.rows;
                  for (let i = 0; i < results.length; i++) {
                    const item = results.item(i);
                    // Process the data here as needed.
                    data.push(item);
                  }
                  // console.log(`Selected data from '${tableName}':`, data);
                  resolve(data);
                },
                (_, error) => {
                  console.error(`Error executing SELECT query on '${tableName}':`, error);
                  reject(error);
                }
              );
            } else {
              // Table does not exist
              resolve(false);
            }
          },
          (_, error) => {
            console.error(`Error checking table existence for '${tableName}':`, error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error(`Error executing transaction on '${tableName}':`, error);
        reject(error);
      }
    );
  });
};
export const updateData = (tableName, data, condition, params) => {
  const updateString = Object.keys(data)
    .map(key => `${key} = ?`)
    .join(', ');
  const values = Object.values(data);

  // Combine values with the condition params
  const queryParams = [...values, ...params];

  const query = `UPDATE ${tableName} SET ${updateString} WHERE ${condition};`;

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          queryParams,
          (_, resultSet) => {
            const rowsAffected = resultSet.rowsAffected;
            console.log(`Data updated in '${tableName}' successfully.`);
            resolve(rowsAffected > 0); // Resolve true if rows were updated, otherwise false
          },
          (txObj, error) => {
            console.error(`Error updating data in '${tableName}': ${error.message}`);
            reject(error);
          }
        );
      },
      (error) => {
        console.error(`Error executing transaction on '${tableName}':`, error);
        reject(error);
      }
    );
  });
};
// updateData('users', { name: 'John', age: 30 }, 'id = ?', [1])

export const updateOrInsertData = async (tableName, dataArray) => {
  // Step 1: Create a list of IDs from the incoming data
  const newIds = dataArray.map(data => data.id);
  let existingIds=await selectData(tableName)
   existingIds=existingIds.map(data => parseInt(data.id))
   let idNeedsToRemove=existingIds.filter((i)=>!newIds.includes(i))
   let idNeedsToAdd=newIds.filter((i)=>!existingIds.includes(i))
   const dataToUpdate=dataArray.filter(item=>{
    return idNeedsToAdd.includes(item.id)
   })
  if(idNeedsToRemove.length>0){
    idNeedsToRemove.forEach((item)=>{

       deleteFromTable(tableName, 'id = ?', [item])
    })
    console.log(`${idNeedsToRemove[idNeedsToRemove.length-1]} data deleted`)
  }
  if(idNeedsToAdd.length>0){
    dataToUpdate.forEach((item)=>{

      InsertData(tableName,item)
    })
    console.log(`${idNeedsToAdd[idNeedsToAdd.length-1]} data added`)
  }
  if(idNeedsToAdd.length==0 && idNeedsToRemove.length==0){
   return "data already updated"
  }
 
};
