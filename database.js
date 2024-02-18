const express = require("express");
const mysql = require("mysql");

const config = {
    host: 'localhost',
    user: 'root',
    password: 'qwertyu',
    database: 'Recipes',
};

const connection = mysql.createConnection(config);


