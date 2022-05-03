// documentation: https://www.npmjs.com/package/instatouch#get-session-id
import instaTouch from 'instatouch';

// documentation: https://www.npmjs.com/package/dotenv
import dotenv from 'dotenv/config';

// documentation: https://nodejs.dev/learn/the-nodejs-fs-module
import fs from 'fs'

// Paste the post slug
const post = 'CcjHlPBu_gg'

/**
 * Obtain all the comments in the post
 * 
 * @param {}
 * @returns {array}
 */
async function getAllParticipants() {
  try {
    const options = {
      count: 100,
      session: process.env.INSTAGRAM_SESSION_ID
    };
    const comments = await instaTouch.comments(post, options);
    return comments.collector
  } catch (error) {
    console.log(error);
  }
}

/**
 * Select one participant winner
 * 
 * @param {array} participants
 * @returns {object}
 */
function pickWinner(participants) {
  const allParticipants = participants.length;
  const pickedTicket = Math.floor(Math.random() * allParticipants);
  const pickedWinner = participants[pickedTicket];
  return pickedWinner
}

/**
 * Save winner in the file
 * 
 * @param {object} winner
 * @returns {file}
 */
function writeWinner(winner) {
  fs.writeFile('goldenTicket.json', JSON.stringify(winner, null, 2), function (err) {
    if (err) console.log(err)
  })
}

async function main() {
  const participants = await getAllParticipants()
  const goldenTicket = pickWinner(participants)
  writeWinner(goldenTicket)
  console.log('Sorteio realizado com sucesso')
}
main()