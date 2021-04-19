# Sensei Bonsai Gamification 

Make your courses more fun with this gamification plugin for Sensei, where the students can claim Knowledge Bonsais in their learning process!

### TODO

This project is a work in progress. Some pending items:

- Don't show the knowledge bonsai if user is not logged-in.
- Ranking block (so competitions can be done between users).
- Issue that copies the unique ID when copying a Knowledge Bonsai block.
- Add extra check to make sure user has access to the page content (course, lesson, etc.). Maybe based in a boolean "Restricted" attribute?
- Register block from metadata to get default attributes. But how to translate them in the json?
- Save post ID where Bonsais were claimed, and show it in the My Bonsai Forest block.
- Refactor PHP side: Separate blocks in different classes.
- Bonsais design.
- Sounds design.
- Animations design.
- Implement i18n.

### Future ideas

- Growing Bonsai block (a block that the user can claim only after X seconds in a page).
- Perseverance Bonsai (when accessing the courses many days in a row).
- Be able to claim Bonsais in some specific actions, like completing courses. It also needs a nice feedback for the user.
- Customize amount of points for Bonsais / actions?
- The points can be exchanged for things, like a coin.
- Be customizable to have different assets than Bonsai.
- Badges feature. The user get badges achieving some goals. E.g.: completing X lessons, getting their first Bonsai, etc.
