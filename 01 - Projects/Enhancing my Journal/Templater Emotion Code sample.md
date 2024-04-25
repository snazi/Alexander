---
date: 2024-04-23T22:31
tags: []
---
<%* // Define emotion categories and their sub-emotions const emotions = { "Happy": ["Content", "Joyful", "Ecstatic"], "Sad": ["Unhappy", "Sorrowful", "Depressed"] }; // Prompt the user to select a main emotion category const mainEmotion = await tp.system.suggester(Object.keys(emotions), Object.keys(emotions), { placeholder: "Select a main emotion category" }); // If a main emotion is selected, prompt for the sub-emotion if (mainEmotion) { const subEmotion = await tp.system.suggester(emotions[mainEmotion], emotions[mainEmotion], { placeholder: `Select a specific emotion for being ${mainEmotion}` }); // Insert the selected sub-emotion or log a message if none was selected if (subEmotion) { tR += `I am feeling ${subEmotion}.`; // Inserts the selected sub-emotion } else { console.log("No specific emotion was selected."); } } else { console.log("No main emotion category was selected."); } -%>


<%* const emotions = [ "happy-proud", "happy-ecstatic", "sad-depressed", // Add more emotions here ]; function getEmotionDisplay (item) { // Converts "happy-proud" to "Happy - proud" let [category, emotion] = item.split("-"); category[0] = category[0].toUpperCase(); return `${category} - ${emotion}`; } const selectedEmotion = await tp.system.suggester(getEmotionDisplay, emotions); -%>

