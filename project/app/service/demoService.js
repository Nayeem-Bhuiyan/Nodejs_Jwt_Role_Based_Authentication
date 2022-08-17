const mysqlConnection = require('../database-setup/database');

const getAll = async () => {
    const response = [];
    let sql = `SELECT * FROM tblName`;
    mysqlConnection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  const getById = async (id) => {
    const response = [];
    let sql = `SELECT * FROM tblName WHERE id=?`;
    mysqlConnection.query(sql,[id], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  const insert = async (data) => {
    const response = [];
    let sql =`INSERT INTO tblName set ?`
    mysqlConnection.query(sql,[data], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  const update = async (id, data) => {
    const response = [];
    let sql =`UPDATE tblName SET ? WHERE id =?`;
    mysqlConnection.query(sql,[data, id], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  const remove = update = async (id) => {
    const response = [];
    let sql = `DELETE FROM tblName WHERE id=?`;
    mysqlConnection.query(sql,[id], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  mysqlConnection.end();
  module.exports = { getAll, getById, insert, update, remove};