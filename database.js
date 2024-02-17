const express = require("express");
const mysql = require("mysql");

const config = {
    host: 'localhost', // replace with your MySQL host
    user: 'root', // replace with your MySQL user
    password: 'Habibi09341!', // replace with your MySQL password
    database: 'Recipes', // replace with your desired database name
};

const connection = mysql.createConnection(config);

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }

    console.log('Connected to MySQL server');

    // Create tables
    connection.query(`
    CREATE TABLE IF NOT EXISTS Recipes (
        recipe_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        instructions TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Categories (
        category_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Ingredients (
        ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Recipe_Categories (
        recipe_id INT,
        category_id INT,
        PRIMARY KEY (recipe_id, category_id),
        FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
        FOREIGN KEY (category_id) REFERENCES Categories(category_id)
    );

    CREATE TABLE IF NOT EXISTS Recipe_Ingredients (
        recipe_id INT,
        ingredient_id INT,
        PRIMARY KEY (recipe_id, ingredient_id),
        FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
        FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
    );
    `, (error) => {
        if (error) {
            console.error('Error creating tables:', error.message);
            connection.end();
            return;
        }

        console.log('Tables created successfully');

        // Insert sample data
        connection.query(`
        INSERT INTO Categories (name) VALUES ('Japanese'), ('Cake'), ('Vegetarian');
        INSERT INTO Ingredients (name) VALUES ('Rice'), ('Flour'), ('Tofu');
        INSERT INTO Recipes (name, instructions) VALUES
        ('Sushi Roll', '...'),
        ('Chocolate Cake', '...'),
        ('Vegetarian Stir Fry', '...');
    `, (insertError) => {
            if (insertError) {
                console.error('Error inserting sample data:', insertError.message);
            } else {
                console.log('Sample data inserted successfully');
            }

            // Close the connection
            connection.end();
        });
    });
});