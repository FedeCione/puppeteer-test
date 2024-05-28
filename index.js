import puppeteer from "puppeteer";
import fs from 'fs/promises';

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com.ar');

  await browser.close();
}

//openWebPage();

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com.ar');
  await page.screenshot({ path: 'google.png'});

  await browser.close();
}

//captureScreenshot();

async function navigateWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400
  });

  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com');
  await page.click('a[href="/login"]');
  await page.screenshot({ path: 'example.png'});
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
}

//navigateWebPage();

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400
  });

  const page = await browser.newPage();
  await page.goto('https://www.example.com');

  const result = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText;
    const description = document.querySelector('p').innerText;
    const more = document.querySelector('a').innerText;
    return {
      title,
      description,
      more
    }
  });
  console.log(result);

  await browser.close();
}

//getDataFromWebPage();

async function handleDynamicWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300
  });

  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com');

  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll('.quote');
    const data = [...quotes].map(quote => {
      const quoteText = quote.querySelector('.text').innerText;
      const quoteAuthor = quote.querySelector('.author').innerText;
      const quoteTags = [...quote.querySelectorAll('.tag')].map(tag => tag.innerText);
      return {
        quoteAuthor,
        quoteText,
        quoteTags
      }
    })
    return data;
  });
  console.log(result);

  await fs.writeFile('quotes.json', JSON.stringify(result, null, 2));

  await browser.close();
}

handleDynamicWebPage();
