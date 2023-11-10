"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
const router = require("express").Router();

// Call TODO Controller:
const todoTemplate = require("../controllers/todoTemplate");

router.get("/", todoTemplate.list);
router.get("/create", todoTemplate.create);
router.post("/create", todoTemplate.create);

router.get("/:id", todoTemplate.read);

router.get("/:id/isDone", todoTemplate.isDone);

router.get("/:id/delete", todoTemplate.delete);

router.get("/:id/update", todoTemplate.update);
router.post("/:id/update", todoTemplate.update);

router.all("/create", todoTemplate.create);

module.exports = router;
