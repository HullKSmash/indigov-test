### Testing Approach & Methodology

## Framework
I chose Cypress as a lightweight, free tool.  I'm very familiar with JS and Mocha/Chai (the 
assertion library that Cypress is built on), making it an approachable framework for me 
to implement on a short timeline.

## What I'd Improve, Ideally
# Locators
Few of the HTML elements in the DOM for this page had IDs.  When they were present, I did 
use them; otherwise, I had to rely on other permanent tags or attributes combined with 
nesting of element get/find.  If this were an application I wanted to test further, I would 
work with developers to add permanent testing IDs to the elements used for automated tests.

# beforeEach and Sorting
For the second block of tests, I would have liked to move the sort-by-name functionality 
up to the beforeEach hook.  It's used by two of the three tests in the block and won't 
interfere with the third.  However, doing so kept tripping an unhandled promise error 
from the application itself, causing Cypress to skip and fail the rest of the tests. This error was not visible in the browser console, so I would need access to the 
application and its logs to properly debug this issue.