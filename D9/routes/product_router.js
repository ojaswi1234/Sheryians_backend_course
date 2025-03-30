const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send('product_home');
})


module.exports = router;