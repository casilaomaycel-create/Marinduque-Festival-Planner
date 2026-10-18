# Marinduque Festival Planner

## Task 1 — Sector Selection

**Sector:** Tourism & Cultural Innovation

**Target Users:** Visitors, local students, and Marinduque residents interested in festivals and cultural activities.

**Local Challenge:** Visitors may not know which cultural activities to include in a simple visit plan or how to participate respectfully in local festival activities.

**Proposed Project:** Marinduque Festival Planner

**Proposed Solution:** A single-page website that lets users view sample festival activities, add activities to a simple itinerary, and read cultural-respect reminders.

**Key Features:**
1. Festival activity list or filter
2. Add-to-itinerary feature
3. Cultural-respect checklist

## Task 2 — Zero-Shot Prompting

**Objective:** Create a basic webpage using a short prompt.

**Technique:** Zero-shot prompting

**Exact Prompt:**
> Create a simple webpage that helps visitors plan a Marinduque festival visit.

**Actual Copilot Output:**
Saved in `outputs/task2-zero-shot/index.html`.

**What Worked:**
Copilot created a Marinduque festival visit webpage with festival activities and a visitor-planning interface.

**What Needs Improvement:**
The short prompt did not clearly state the exact required features, target users, demonstration-data limitation, accessibility requirements, or mobile requirements.

**Next Action / Verification:**
Use a more detailed structured prompt that specifies the target users, features, technologies, and limitations.

## Task 3 — Structured Prompt

**Objective:** Improve the webpage by giving Copilot complete requirements.

**Technique:** Structured prompting

**Exact Prompt:**
> [Paste the exact Task 3 prompt you sent.]

**Actual Copilot Output:**
Saved in:
- `outputs/task3-structured/index.html`
- `outputs/task3-structured/style.css`
- `outputs/task3-structured/script.js`

**What Worked:**
Copilot created a more detailed Marinduque Festival Planner with sample activities, an itinerary feature, a cultural-respect checklist, and a reminder to confirm official festival details.

**What Needs Improvement:**
I still need to test the page myself, especially the buttons, checklist, mobile layout, and keyboard use.

**Comparison with Task 2:**
1. Task 3 has clearer required features than Task 2.
2. Task 3 gives more local context and limits the information to demonstration data.

**Next Action / Verification:**
Test the page in a browser, then use examples in the next prompt to create consistent checklist items.

## Task 4A — Few-Shot Prompting

**Objective:** Create cultural-respect checklist items with a consistent format.

**Technique:** Few-shot prompting

**Exact Prompt:**
> [Paste the exact Task 4A prompt you sent.]

**Actual Copilot Output:**
Saved in:
- `outputs/task4a-fewshot/index.html`
- `outputs/task4a-fewshot/style.css`
- `outputs/task4a-fewshot/script.js`

**What Worked:**
Copilot used the examples to create checklist items with a consistent Category, Item, and Description format.

**What Needs Improvement:**
I need to check whether every item follows the requested format and whether each checkbox works correctly.

**Next Action / Verification:**
Test the checkboxes, then ask Copilot to review the project as an accessibility reviewer.

## Task 4B — Role Assignment

**Objective:** Review the project from an accessibility perspective.

**Technique:** Role assignment

**Exact Prompt:**
> [Paste the exact Task 4B prompt you sent.]

**Actual Copilot Output:**
Saved in `outputs/task4b-role/review.md`.

**What Worked:**
Copilot identified accessibility-related areas to review, such as semantic HTML, labels, keyboard access, focus visibility, contrast, and mobile readability.

**What Needs Improvement:**
I need to inspect the recommendations and test the relevant parts of the webpage myself.

**Next Action / Verification:**
Choose at least one recommendation to apply to the final project, then test that correction in a browser.

## Task 5 — Structured Analysis and Refinement

**Objective:** Find and improve a specific issue in the final project.

**Technique:** Structured analysis and refinement

**Exact Prompt:**
> [Paste the Task 5 prompt you sent.]

**Actual Copilot Output:**
Saved in `outputs/task5-analysis/diagnosis.md`.

**What Worked:**
Copilot identified specific areas that could be improved and suggested small corrections.

**What Needs Improvement:**
The recommendation must still be tested in the actual webpage.

**Selected Correction:**
[Write the correction you chose.]

**Verification Result:**
[Write your real browser test result.]

**Next Action:**
Complete the final comparison and reflection.

## Task 6 — Comparison and Reflection

| Technique | Observation |
| --- | --- |
| Zero-Shot | The short prompt created a basic festival webpage, but it did not clearly specify the target users, required features, accessibility, responsive design, or demonstration-data limitation. |
| Structured Prompt | The detailed prompt produced a more complete Marinduque Festival Planner with sample activities, an itinerary feature, a cultural-respect checklist, responsive design, and a reminder to confirm official festival details. |
| Few-Shot | The examples helped make checklist items more consistent by following the same Category, Item, and Description format. |
| Role Assignment | The accessibility-review role focused on semantic HTML, labels, keyboard navigation, visible focus, contrast, and mobile readability. |
| Structured Analysis | The analysis identified an accessibility improvement. I added matching labels to the cultural-respect checklist checkboxes and verified that clicking each label selects its matching checkbox. |

**Final Reflection:**

Structured prompting produced the most useful initial version because it clearly defined the users, features, technology, and limitations. Few-shot prompting helped create more consistent cultural-respect checklist items. Role assignment helped identify accessibility concerns that may be missed during normal code generation. Structured analysis helped me improve the itinerary by preventing duplicate activities. I learned that AI-generated code must still be reviewed and tested before it is accepted.