# Live Chat — Visitor Manual Test Cases

> **Precondition for all tests:** No Mira AI agent is published. Chat is handled by a human operator.

---

## TC-V-01 · Visitor Sends Message

**Tags:** `@smoke`

| #   | Step                                                 | Expected result                                            |
| --- | ---------------------------------------------------- | ---------------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations                | All conversations list is visible                          |
| 2   | Open Inbox and open the "Discover Live Chat" article | Test page opens in a new tab                               |
| 3   | In the visitor tab, send a text message              | Message is sent                                            |
| 4   | Switch back to the operator tab                      | —                                                          |
| 5   | Open **New conversations**                           | Incoming conversation appears with the sent message        |
| 6   | Open the conversation                                | Message text is visible in the conversation detail         |
| 7   | Verify the message content                           | Message text exactly matches what was typed by the visitor |

---

## TC-V-02 · Visitor Sends File Attachment

**Tags:** `@file-upload`

| #   | Step                                                 | Expected result                                                       |
| --- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations                | All conversations list is visible                                     |
| 2   | Open Inbox and open the "Discover Live Chat" article | Test page opens in a new tab                                          |
| 3   | In the visitor tab, send a text message              | Message is sent                                                       |
| 4   | Attach `file.txt` using the file upload button       | File preview is shown before sending                                  |
| 5   | Send the attachment                                  | File is sent                                                          |
| 6   | Switch back to the operator tab                      | —                                                                     |
| 7   | Open **New conversations**                           | Conversation with the file attachment is listed                       |
| 8   | Open the conversation                                | `file.txt` attachment is visible in the conversation detail           |
| 9   | Verify the attachment content                        | Attachment content matches the uploaded file                          |
| 10  | Verify the attachment                                | Attachment filename and content exactly match the uploaded `file.txt` |

---

## TC-V-03 · Visitor Rates Chat After Resolution

**Tags:** `@chat`, `@rating`

| #   | Step                                                                            | Expected result                                                           |
| --- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1   | Open the chat widget as a visitor and send a message                            | Message is sent                                                           |
| 2   | Switch to the operator tab and open **New conversations**                       | Conversation is visible                                                   |
| 3   | Open the conversation and click the **Resolve** button                          | Conversation is marked as resolved                                        |
| 4   | Switch to the visitor tab                                                       | —                                                                         |
| 5   | In the chat widget, click the **Rate chat** button                              | Rating prompt appears with the question "How would you rate our support?" |
| 6   | Select a rating                                                                 | Rating is selected and message window for further feedback is presented   |
| 7   | Type a message in the optional comment field and submit                         | Rating and comment are sent                                               |
| 8   | Switch to the operator tab, go to **Agents** and open **Resolved by operators** | Resolved conversation is listed                                           |
| 9   | Open the conversation and verify the rating and comment                         | Both the rating score and the comment are visible in the conversation     |

---

## TC-V-04 · Chat Widget — Keyboard Navigation and Send

**Tags:** `@chat`, `@accessibility`

| #   | Step                                                    | Expected result                                                                                                       |
| --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Open the chat widget as a visitor                       | Widget is open and focused                                                                                            |
| 2   | Press **Tab** to move focus through the widget elements | Focus moves sequentially to each interactive element (e.g. close button, input field, send button, attachment button) |
| 3   | Tab to the message input field                          | Input field receives focus                                                                                            |
| 4   | Type a message using the keyboard                       | Text appears in the input field                                                                                       |
| 5   | Press **Enter**                                         | Message is sent without clicking the send button                                                                      |

---

## TC-V-05 · Visitor Message After Page Reload

**Tags:** `@chat`

| #   | Step                                                 | Expected result                                        |
| --- | ---------------------------------------------------- | ------------------------------------------------------ |
| 1   | Open the chat widget as a visitor and send a message | Message is sent                                        |
| 2   | Reload the visitor page                              | Page reloads                                           |
| 3   | Re-open the chat widget                              | Previous conversation history is preserved and visible |
| 4   | Send a new message in the chat widget                | Message is sent successfully                           |
| 5   | Switch to the operator tab                           | Both the original and new message are visible          |

---

## TC-V-06 · Visitor Sends Unsupported File Type

**Tags:** `@chat`, `@file-upload`, `@negative`

| #   | Step                                                               | Expected result                                             |
| --- | ------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1   | Open the chat widget as a visitor                                  | Widget is open                                              |
| 2   | Attempt to attach a file with a disallowed extension (e.g. `.exe`) | An error message is shown; This file type is not supported. |

---

## TC-V-07 · Visitor Toggles Sound Notifications

**Tags:** `@chat`, `@ui`

| #   | Step                                                                   | Expected result                              |
| --- | ---------------------------------------------------------------------- | -------------------------------------------- |
| 1   | Open the chat widget as a visitor                                      | Widget is open                               |
| 2   | Open **Options** in the chat widget                                    | Options menu is visible                      |
| 3   | Locate the **Play sounds** toggle and turn it **off**                  | Toggle switches to off state                 |
| 4   | Send a message via the chat widget                                     | Message is sent; no notification sound plays |
| 5   | Open **Options** again and turn the **Play sounds** toggle back **on** | Toggle switches to on state                  |
| 6   | Send another message via the chat widget                               | Message is sent; notification sound plays    |

---

## TC-V-08 · Visitor Downloads Chat Transcript

**Tags:** `@chat`, `@ui`

| #   | Step                                                            | Expected result                                                           |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1   | Open the chat widget as a visitor and exchange several messages | Messages are sent and visible in the chat                                 |
| 2   | Open **Options** in the chat widget                             | Options menu is visible                                                   |
| 3   | Click **Download transcript**                                   | A transcript file is downloaded                                           |
| 4   | Open the downloaded transcript                                  | File opens successfully                                                   |
| 5   | Verify the transcript content matches the chat                  | All messages, senders, and order in the transcript match the chat history |
