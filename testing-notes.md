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

# Modular Refactor of Reusable Functions
There are a few places where I reuse code that could be placed into separate functions.  
For this small project, this works fine, but for more tests I would export common functions 
(like getting lists and ensuring they're sorted) for better maintainability.

# App Response Flakiness
I occasionally run into an error from the Github app itself, not my tests, that interrupts 
my beforeEach block for sorting repos.  After trying a few approaches, this seems to have little to do with specific features of my tests, and they often pass on a retry.  This is 
hard to diagnose and further debug without access to the app itself and related logs.