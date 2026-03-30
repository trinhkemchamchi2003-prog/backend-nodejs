const bcrypt = require('bcrypt');
const path = require('path');
const saltRounds = 10;
const axios = require('axios');

// FIXED NUMBER
const fixedNumber = (num) => {
  if (!num) return num;
  return num.toFixed(2);
};

// RANDOM INTEGER
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateFileName = (originalName) => {
  const ext = path.extname(originalName);
  const timestamp = Math.floor(Date.now() / 1000);
  return `${timestamp}${ext}`;
};

// HASH BCRYPT
const hashBcrypt = async (data) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// COMPARE
const compareBcrypt = async (hash, data) => {
  try {
    const result = await bcrypt.compare(data, hash);
    return result ? true : false;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//RECAPCHA
const verifyRecaptcha = async (token) => {
  try {
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
    const res = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: { secret: RECAPTCHA_SECRET, response: token },
    });
    return res.data.success;
  } catch (err) {
    console.error('Recaptcha error:', err);
    return false;
  }
};

// CREATE SLUG
const createSlug = (title) => {
  return title
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

module.exports = {
  fixedNumber,
  hashBcrypt,
  compareBcrypt,
  createSlug,
  getRandomInt,
  generateFileName,
  verifyRecaptcha,
};
