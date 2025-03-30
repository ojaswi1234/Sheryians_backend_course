const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Gand mara chutiye!');
})


module.exports = router;