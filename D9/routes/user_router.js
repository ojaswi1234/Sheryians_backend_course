const express = require("express");
const router = express.Router();


console.log(process.env.NODE_ENV);

router.get('/', (req, res) => {
    res.send('Gand mara chutiye!');
})




module.exports = router;