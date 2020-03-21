const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/update_screenshot', (req, res, next) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 600,
      height: 600,
      deviceScaleFactor: 1,
      isMobile: true,
    });
    await page.goto('http://localhost:3001/summary', {'waitUntil': 'networkidle0'});
    await page.screenshot({path: '../public/thumbnail.png'});

    await browser.close();
  })();
  res.sendStatus(200);
});

module.exports = router;
