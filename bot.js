const puppeteer = require('puppeteer');
const url = 'https://popcat.click/';
app = async (click) => {
  const cookie = {
    name: 'country',
    value: 'LA',
    domain: '.popcat.click',
    httpOnly: true,
    secure: true,
    session: false,
  }
  const browser = await puppeteer.launch();
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const page = await browser.newPage();
  page.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36")

  await page.goto(url);
  await page.setCookie(cookie);
  let showcookie = await page.cookies(url);
  console.log(showcookie);

  await delay(2000);
  console.log('ready!');
  for (let i = 0; i < click; i++) {
    await delay(Math.random() * 90);
    await page.click('[id="app"]');
    console.log(`MeowPop ~~ x ${i}`);
    if (i % 800 === 0) {
      await delay(3000);
      await page.screenshot({
        path: `screenshot${i}.png`
      });
    }
  }
  await page.screenshot({
    path: `screenshot.png`
  });
  await browser.close();
}
app(9999);