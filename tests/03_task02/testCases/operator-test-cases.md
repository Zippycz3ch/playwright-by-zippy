# Live Chat — Operator Manual Test Cases

> **Precondition for all tests:** No Mira AI agent is published. Chat is handled by a human operator.

---

## TC-O-00 · Operator Chat — Inbox Navigation

**Tags:** `@smoke`, `@ui`

| #   | Step                                             | Expected result                                                              |
| --- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations            | All conversations list is visible                                            |
| 2   | Open **Inbox**                                   | Inbox section loads with conversation tabs visible                           |
| 3   | Click the **New** tab                            | List of new/unassigned conversations is shown                                |
| 4   | Click the **All** tab                            | List of all conversations is shown                                           |
| 5   | Click the **Resolved** tab                       | List of resolved conversations is shown                                      |
| 6   | Click a conversation in the list                 | Conversation detail opens with message history                               |
| 7   | Close the conversation detail and return to list | Inbox list is visible again; previously selected conversation is highlighted |

---

## TC-O-01 · Operator Replies to Visitor

**Tags:** `@e2e`

| #   | Step                                                        | Expected result                                    |
| --- | ----------------------------------------------------------- | -------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations                       | All conversations list is visible                  |
| 2   | Open Inbox and open the "Discover Live Chat" article        | Test page opens in a new tab                       |
| 3   | In the visitor tab, send a text message                     | Message is sent                                    |
| 4   | Switch back to the operator tab                             | —                                                  |
| 5   | Open **New conversations**                                  | Conversation appears with visitor's message        |
| 6   | Open the conversation and verify visitor message is present | Message text matches what was sent                 |
| 7   | Type and send an operator reply                             | Reply is sent                                      |
| 8   | Switch to the visitor tab                                   | —                                                  |
| 9   | Check the chat widget                                       | Operator's reply is visible to the visitor         |
| 10  | Verify the reply content                                    | Reply text exactly matches what the operator typed |

---

## TC-O-02 · Operator Resolves Conversation

**Tags:** `@chat`

| #   | Step                                    | Expected result                    |
| --- | --------------------------------------- | ---------------------------------- |
| 1   | Log in and open an active conversation  | Conversation is open               |
| 2   | Click the **Resolve** button            | Conversation is marked as resolved |
| 3   | Check the **Resolved** tab in the inbox | Conversation appears there         |

---

## TC-O-03 · Operator Assigns and Reassigns Conversation

**Tags:** `@chat`

| #   | Step                                                           | Expected result                                                  |
| --- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | Log in and receive an incoming visitor message                 | Conversation appears in New conversations                        |
| 2   | Open the conversation                                          | Conversation detail is visible                                   |
| 3   | Assign the conversation to a specific operator or team         | Assignment is saved and reflected in the conversation header     |
| 4   | Verify the conversation moves to the assigned operator's inbox | Conversation is no longer in unassigned/new queue                |
| 5   | Reassign the conversation to a different operator or team      | New assignment is saved and reflected in the conversation header |
| 6   | Verify the conversation appears in the new assignee's inbox    | Conversation is no longer assigned to the previous operator      |

---

## TC-O-04 · Operator Filters Resolved Conversations

**Tags:** `@chat`

| #   | Step                                            | Expected result                                                  |
| --- | ----------------------------------------------- | ---------------------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations           | All conversations list is visible                                |
| 2   | Go to **Inbox** and open **Resolved by agents** | List of resolved conversations is shown                          |
| 3   | Click the **Search** button                     | Search bar appears                                               |
| 4   | Type a keyword in the search field              | Conversations matching the keyword are filtered                  |
| 5   | Apply a **Rating** filter                       | Only conversations with the selected rating are shown            |
| 6   | Apply an **Operators** filter                   | Only conversations handled by the selected operator(s) are shown |
| 7   | Apply a **Channels** filter                     | Only conversations from the selected channel(s) are shown        |
| 8   | Clear all filters                               | Full list of resolved conversations is restored                  |

---

## TC-O-05 · Operator Adds and Removes Visitor Email and Phone

**Tags:** `@chat`

| #   | Step                                                              | Expected result                                                 |
| --- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations and open a conversation     | Conversation detail panel is visible                            |
| 2   | Click **Fill in visitor's email** and enter a valid email address | Email is saved and displayed in the contact detail panel        |
| 3   | Click **Fill in visitor's phone number** and enter a valid number | Phone number is saved and displayed in the contact detail panel |
| 4   | Reload the page and reopen the conversation                       | Email and phone number are still present and unchanged          |
| 5   | Clear the email field and save                                    | Email is removed from the contact detail panel                  |
| 6   | Clear the phone number field and save                             | Phone number is removed from the contact detail panel           |
| 7   | Reload the page and reopen the conversation                       | Email and phone fields are empty                                |

---

## TC-O-06 · Operator Adds and Removes a Note from Conversation

**Tags:** `@chat`

| #   | Step                                                          | Expected result                                      |
| --- | ------------------------------------------------------------- | ---------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations and open a conversation | Conversation detail panel is visible                 |
| 2   | Click the **Note** field                                      | Note input becomes editable                          |
| 3   | Type a note and save it                                       | Note is saved and visible in the conversation detail |
| 4   | Reload the page and reopen the conversation                   | Note is still present and unchanged                  |
| 5   | Delete the note                                               | Note is removed from the conversation detail         |
| 6   | Reload the page and reopen the conversation                   | Note field is empty                                  |

---

## TC-O-07 · Operator Adds and Removes Contact Tag

**Tags:** `@chat`

| #   | Step                                                          | Expected result                              |
| --- | ------------------------------------------------------------- | -------------------------------------------- |
| 1   | Navigate to Inbox → All conversations and open a conversation | Conversation detail panel is visible         |
| 2   | Click **+ Add tag** in the **Contact tags** section           | Tag input or dropdown appears                |
| 3   | Add a tag (e.g. `Customer care`)                              | Tag is displayed in the Contact tags section |
| 4   | Remove the tag                                                | Tag is removed from the Contact tags section |

---

## TC-O-08 · Operator Adds and Removes Contact Property

**Tags:** `@chat`

| #   | Step                                                                    | Expected result                                                                      |
| --- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | Navigate to Inbox → All conversations and open a conversation           | Conversation detail panel is visible                                                 |
| 2   | Click **+ Add contact property** in the **Contact information** section | "Create contact property" dialog appears                                             |
| 3   | Fill in the **Property name**                                           | Name is entered; it will be shown in the contact list and conversation detail        |
| 4   | Fill in the **Property key**                                            | Key is entered; it will appear in CSV exports and cannot be changed after saving     |
| 5   | Select the **Property type**                                            | Type is selected; it determines the answer format and cannot be changed after saving |
| 6   | Save the property                                                       | Property is created and displayed in the Contact information section                 |
| 7   | Reload the page and reopen the conversation                             | Contact property is still present and unchanged                                      |
| 8   | Delete the contact property                                             | Property is removed from the Contact information section                             |
| 9   | Reload the page and reopen the conversation                             | Contact property is no longer present                                                |

---

## TC-O-09 · Operator Exports Conversation via Menu

**Tags:** `@chat`

| #   | Step                                                                | Expected result                                                         |
| --- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations and open a conversation       | Conversation detail is visible                                          |
| 2   | Click the **...** (more options) menu in the conversation header    | Dropdown menu appears with export options                               |
| 3   | Select **Export to PDF**                                            | A PDF file of the conversation is downloaded                            |
| 4   | Open the PDF and verify it contains the conversation messages       | All messages and senders are present in the exported PDF                |
| 5   | Open the **...** menu again and select **Send transcript to email** | Email input dialog or confirmation appears                              |
| 6   | Enter a valid email address and confirm                             | Confirmation is shown; transcript email is sent to the provided address |

---

## TC-O-10 · Operator Deletes Conversation

**Tags:** `@chat`

| #   | Step                                                             | Expected result                                            |
| --- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| 1   | Navigate to Inbox → All conversations and open a conversation    | Conversation detail is visible                             |
| 2   | Click the **...** (more options) menu in the conversation header | Dropdown menu appears                                      |
| 3   | Select **Delete conversation**                                   | Confirmation dialog appears                                |
| 4   | Confirm the deletion                                             | Conversation is deleted and no longer visible in the inbox |
