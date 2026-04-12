# Live Chat — Operator Manual Test Cases

> **Precondition for all tests:** No Mira AI agent is published. Chat is handled by a human operator.

---

## TC-O-01 · Operator Replies to Visitor

**Tags:** `@e2e`

| #   | Step                                                        | Expected result                                    |
| --- | ----------------------------------------------------------- | -------------------------------------------------- |
| 1   | Log in to Smartsupp dashboard                               | Dashboard is visible                               |
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

## TC-O-02 · Operator Assigns Conversation

**Tags:** `@chat`

| #   | Step                                                           | Expected result                                              |
| --- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | Log in and receive an incoming visitor message                 | Conversation appears in New conversations                    |
| 2   | Open the conversation                                          | Conversation detail is visible                               |
| 3   | Assign the conversation to a specific operator or team         | Assignment is saved and reflected in the conversation header |
| 4   | Verify the conversation moves to the assigned operator's inbox | Conversation is no longer in unassigned/new queue            |

---

## TC-O-03 · Operator Closes Conversation

**Tags:** `@chat`

| #   | Step                                                                       | Expected result                                                 |
| --- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | Log in and open an active conversation                                     | Conversation is open                                            |
| 2   | Click the **Resolve** button                                               | Conversation is marked as resolved                              |
| 3   | Check the **Resolved** tab in the inbox                                    | Conversation appears there                                      |
| 4   | Verify the visitor's chat widget reflects the closed state (if applicable) | Widget shows conversation as ended or allows starting a new one |
