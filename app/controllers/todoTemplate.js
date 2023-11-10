"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
require("express-async-errors");

const Todo = require("../models/todo");
const PRIORITY = {
  1: "High",
  0: "Normal",
  "-1": "Low",
};

module.exports = {
  list: async (req, res) => {
    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll();

    res.render("todoList", { data, PRIORITY });
  },

  // CRUD METHODS:

  create: async (req, res) => {
    console.log(req.method);
    if (req.method == "POST") {
      const data = await Todo.create(req.body);
      res.redirect("/view");
    } else {
      res.render("todoCreate");
    }
  },

  read: async (req, res) => {
    const data = await Todo.findByPk(req.params.id);

    res.render("todoRead", { todo: data.dataValues, PRIORITY });
  },

  update: async (req, res) => {
    if (req.method == "POST") {
      const isUpdated = await Todo.update(req.body, {
        where: { id: req.params.id },
      });
      res.redirect("/view");
    } else {
      res.render("todoUpdate");
    }
  },
  isDone: async (req, res) => {
    const data = await Todo.findByPk(req.params.id);
    console.log(data.dataValues);

    data.dataValues.isDone = !data.dataValues.isDone;
    const isUpdated = await Todo.update(data.dataValues, {
      where: { id: data.dataValues.id },
    });
    console.log(data.dataValues.isDone);
    res.redirect("/view");
  },

  delete: async (req, res) => {
    const isDeleted = await Todo.destroy({ where: { id: req.params.id } });

    res.redirect("/view");
  },
};
