# Live Chat — Visitor Manual Test Cases

> **Precondition for all tests:** No Mira AI agent is published. Chat is handled by a human operator.

---

## TC-V-01 · Visitor Sends Message

**Tags:** `@smoke`

| #   | Step                                                         | Expected result                                            |
| --- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| 1   | Log in to Smartsupp dashboard                                | Dashboard is visible                                       |
| 2   | Open Inbox                                                   | Inbox section loads                                        |
| 3   | Open the "Discover Live Chat" article to get a test chat URL | Test page opens in a new tab                               |
| 4   | In the visitor tab, send a text message via the chat widget  | Message is sent                                            |
| 5   | Switch back to the operator (dashboard) tab                  | —                                                          |
| 6   | Open the **New conversations** tab                           | Incoming conversation appears with the sent message        |
| 7   | Open the conversation                                        | Message text is visible in the conversation detail         |
| 8   | Verify the message content                                   | Message text exactly matches what was typed by the visitor |

---

## TC-V-02 · Visitor Sends File Attachment

**Tags:** `@file-upload`

| #   | Step                                                 | Expected result                                             |
| --- | ---------------------------------------------------- | ----------------------------------------------------------- |
| 1   | Log in to Smartsupp dashboard                        | Dashboard is visible                                        |
| 2   | Open Inbox and open the "Discover Live Chat" article | Test page opens in a new tab                                |
| 3   | In the visitor tab, send a text message              | Message is sent                                             |
| 4   | Attach `file.txt` using the file upload button       | File preview is shown before sending                        |
| 5   | Send the attachment                                  | File is sent                                                |
| 6   | Switch back to the operator tab                      | —                                                           |
| 7   | Open **New conversations**                           | Conversation with the file attachment is listed             |
| 8   | Open the conversation                                | `file.txt` attachment is visible in the conversation detail |
| 9   | Verify the attachment name                           | Attachment filename exactly matches `file.txt` as uploaded  |

---

## TC-V-03 · Chat Widget — Keyboard Navigation and Send

**Tags:** `@chat`, `@accessibility`

| #   | Step                                                    | Expected result                                                                                                       |
| --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Open the chat widget as a visitor                       | Widget is open and focused                                                                                            |
| 2   | Press **Tab** to move focus through the widget elements | Focus moves sequentially to each interactive element (e.g. close button, input field, send button, attachment button) |
| 3   | Tab to the message input field                          | Input field receives focus                                                                                            |
| 4   | Type a message using the keyboard                       | Text appears in the input field                                                                                       |
| 5   | Press **Enter**                                         | Message is sent without clicking the send button                                                                      |
| 6   | Verify the sent message appears in the chat             | Message is visible in the conversation and matches what was typed                                                     |
| 7   | Switch to the operator tab                              | —                                                                                                                     |
| 8   | Open the conversation                                   | Message is present in the operator inbox, content matches exactly                                                     |

---

## TC-V-04 · Visitor Rates Chat After Resolution

**Tags:** `@chat`, `@rating`

| #   | Step                                                              | Expected result                                                           |
| --- | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1   | Log in and receive an incoming visitor message                    | Conversation appears in New conversations                                 |
| 2   | Open the conversation and resolve it using the **Resolve** button | Conversation is marked as resolved                                        |
| 3   | Switch to the visitor tab                                         | —                                                                         |
| 4   | In the chat widget, click the **Rate chat** button                | Rating prompt appears with the question "How would you rate our support?" |
| 5   | Select a rating (e.g. thumbs up / star)                           | Rating is selected                                                        |
| 6   | Type a message in the optional comment field and submit           | Rating and comment are sent                                               |
| 7   | Switch to the operator tab                                        | —                                                                         |
| 8   | Open the resolved conversation in the inbox                       | Rating result (score and comment) is visible in the conversation detail   |

---

## TC-V-05 · Visitor Sends Special Characters and Emojis

**Tags:** `@chat`

| #   | Step                                                                               | Expected result                                                               |
| --- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | Log in to Smartsupp dashboard and open a test conversation                         | Both tabs ready                                                               |
| 2   | In the visitor tab, send a message containing special characters, e.g. `< > & " '` | Message is sent without error                                                 |
| 3   | Send a second message with emojis, e.g. `Hello 👋 🎉 😊`                           | Message is sent without error                                                 |
| 4   | Switch to the operator tab and open the conversation                               | Both messages appear exactly as typed — characters and emojis are not mangled |

---

## TC-V-06 · Visitor Sends Empty Message

**Tags:** `@chat`, `@negative`

| #   | Step                                          | Expected result                                                    |
| --- | --------------------------------------------- | ------------------------------------------------------------------ |
| 1   | Open the chat widget as a visitor             | Widget is open                                                     |
| 2   | Click the send button without typing anything | Message is not sent; send button is disabled or input is validated |
| 3   | Press Enter without typing anything           | Same — no empty message is created                                 |

---

## TC-V-07 · Chat Widget — Visitor Minimizes and Restores

**Tags:** `@chat`, `@ui`

| #   | Step                                                 | Expected result                                                                |
| --- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | Open the chat widget as a visitor and send a message | Message is sent                                                                |
| 2   | Minimize the widget                                  | Widget collapses to the chat button                                            |
| 3   | Operator sends a reply                               | —                                                                              |
| 4   | Re-open the widget                                   | Previous messages and the operator reply are all visible; no messages are lost |

---

## TC-V-08 · Visitor Message After Page Reload

**Tags:** `@chat`

| #   | Step                                                 | Expected result                                              |
| --- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 1   | Open the chat widget as a visitor and send a message | Message is sent                                              |
| 2   | Reload the visitor page                              | Page reloads                                                 |
| 3   | Re-open the chat widget                              | Previous conversation history is preserved and visible       |
| 4   | Switch to the operator tab                           | Original message is still in the conversation; no duplicates |

---

## TC-V-09 · Visitor Sends Large File Attachment

**Tags:** `@chat`, `@file-upload`, `@negative`

| #   | Step                                                         | Expected result                                                           |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 1   | Open the chat widget as a visitor                            | Widget is open                                                            |
| 2   | Attempt to attach a file that exceeds the allowed size limit | An error message is shown explaining the size limit; file is not uploaded |

---

## TC-V-10 · Visitor Sends Unsupported File Type

**Tags:** `@chat`, `@file-upload`, `@negative`

| #   | Step                                                               | Expected result                                 |
| --- | ------------------------------------------------------------------ | ----------------------------------------------- |
| 1   | Open the chat widget as a visitor                                  | Widget is open                                  |
| 2   | Attempt to attach a file with a disallowed extension (e.g. `.exe`) | An error message is shown; file is not uploaded |
