const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const express = require("express");
const router = express.Router();

const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}


async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.labels.list({
    userId: "me",
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }

  // labels.forEach((label) => {
  //   console.log(`- ${label.name} : ${label.id}`);
  // });
}

fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listMessages);
});

authorize().then(listLabels).catch(console.error);

// List labels route
router.get("/labels", async (req, res) => {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ version: "v1", auth });
    const response = await gmail.users.labels.list({ userId: "me" });
    const labels = response.data.labels;
    res.json(labels);
  } catch (error) {
    console.error("Error listing labels:", error.message);
    res.status(500).json({ error: "Failed to list labels" });
  }
});

// List messages route
router.get("/messages", async (req, res) => {
  try {
    const pageSize = 6; // Number of messages per page
    const auth = await authorize();
    const gmail = google.gmail({ version: "v1", auth });

    let pageToken;
    let page = parseInt(req.query.page) || 1;
    if (page > 1) {
      // If it's not the first page, calculate the pageToken based on the number of pages to skip
      const totalMessages = (page - 1) * pageSize;
      const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: totalMessages,
      });
      pageToken = response.data.nextPageToken;
    }

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: pageSize,
      pageToken: pageToken || undefined,
    });

    const messages = response.data.messages || [];

    // Retrieve the full payload for each message
    const fullMessages = await Promise.all(
      messages.map(async (message) => {
        const fullMessageResponse = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "full",
        });

        const id = fullMessageResponse.data.id;

        // Getting the name and email of the sender
        const SenderName = fullMessageResponse.data.payload.headers.find(
          (header) => header.name === "From"
        );
        const sender = SenderName ? SenderName.value : "";
        const match = sender.match(/(.*)<(.*)>/);
        const name = match ? match[1].trim() : "";
        const email = match ? match[2].trim() : "";

        // Getting the subject
        const subject = fullMessageResponse.data.payload.headers.find(
          (header) => header.name === "Subject"
        );

        const subjectMessage = subject.value;

        // Getting the message
        const text = fullMessageResponse.data.snippet;

        return { id, name, email, subjectMessage, text };
      })
    );

    const totalMessages = response.data.resultSizeEstimate;
    const totalPages = Math.ceil(totalMessages / pageSize);

    res.json({
      page,
      totalPages,
      messages: fullMessages,
    });
  } catch (error) {
    console.error("Error listing messages:", error.message);
    res.status(500).json({ error: "Failed to list messages" });
  }
});


// Get message route
router.get("/messages/:id", async (req, res) => {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ version: "v1", auth });
    const messageId = req.params.id;
    const response = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
    });
    const message = response.data;
    res.json(message);
  } catch (error) {
    console.error("Error retrieving message:", error.message);
    res.status(500).json({ error: "Failed to retrieve message" });
  }
});

module.exports = router;
