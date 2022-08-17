const mysqlConnection = require('../database-setup/database');
const getAll = async () => {
    const response = [];
    response=await pool.query('SELECT * FROM tblName');
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
    response=await pool.query('SELECT * FROM tblName');
    let sql = `SELECT * FROM tblName`;
    mysqlConnection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  const create = async (data) => {
    const response = [];
    response=await pool.query('SELECT * FROM tblName');
    let sql = `SELECT * FROM tblName`;
    mysqlConnection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  const update = async (id, data) => {
    const response = [];
    response=await pool.query('SELECT * FROM tblName');
    let sql = `SELECT * FROM tblName`;
    mysqlConnection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  const remove = async (id) => {
    const response = [];
    response=await pool.query('SELECT * FROM tblName');
    let sql = `SELECT * FROM tblName`;
    mysqlConnection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      response=results;
    });
    return response;
  };
  
  mysqlConnection.end();
  module.exports = { getAll, getById, create, update, remove };