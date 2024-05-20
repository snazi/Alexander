console.log("START SCRIPT")

// * all passed down variables in the file get stored in input
console.log("date passed down is " + input['dateToday'])

// TODO: pass down the dates from the template file
var dateformat = "MMM DD, YYYY";
var endDate = moment(input['dateToday']).endOf('week');
var startDate = moment(input['dateToday']).endOf('week').subtract(6, "days");
var dateToCheck;
var pathMonth = moment(input['dateToday']).format('MMMM');
var pathYear = moment(input['dateToday']).format('YYYY');
var journalPath = "08 - Journals/Life/Daily/"+ pathYear + "/" + pathMonth;

console.log("created path month "+ pathMonth + " created path Year " + pathYear)
console.log("created path is: "+ journalPath)
console.log(startDate.format('YYYY-MM-DD') + " to " + endDate.format('YYYY-MM-DD'))

const journalEntriesInTheWeek = await Promise.all(
    dv
    // TODO: use templater to change the folder path. <original journal directory>/<year>/<month>
    .pages(`"${journalPath}"`)
      // * if the date in the frontmatter is between start and end of the week
    .where((page) =>
      // * using the bracket notation is how I can get variable names that contain hyphen (-)
      moment(page.file.frontmatter['journal-start-date'].toString()).isBetween(startDate, endDate)
    )
    .map((page) =>
      // * for some reason, it won't process multiline notation. "resolve" works only when its done in one line
      new Promise(async (resolve, reject) => {
        const content = await dv.io.load(page.file.path);
        resolve({
          link: page.file.link,
          content,
          ctime: page.file.frontmatter['journal-start-date'].toString()
        });
      })
    )
);

// * function parses the journal entries to only retain entries with the emotion
const emotionsPerEntry = journalEntriesInTheWeek.map(({ link, content, ctime }) => ({
  link,
  entry: content
    .split("\n\n") //* Separate each paragraph in the content
    .filter((content) => /^(\S+) (\d+): (.+)$/.test(content)) // * Only get paragraphs that match the regex
    .map((content) => {
      const match = content.match(/^(\S+) (\d+): (.+)$/);
      return {
        emotion: match[1],
        strength: parseInt(match[2]),
        description: match[3],
        ctime
      };
    }),
}));

// TODO: list down all my known emotions
const emotionMapping = {
  Happiness: 'happy',
  Joy: 'happy',
  Excitement: 'happy',
  Sadness: 'sad',
  Boredom: 'sad',
  Anger: 'angry',
  Anxiety: 'fearful',
  Fear: 'fearful',
  Surprise: 'surprised',
  Relaxation: 'bad',  // Assuming relaxation could fall under 'bad' for this example, adjust as necessary
  // Add more specific emotions and their mappings as needed
};

// * Group entries by underlying emotions
const groupedByUnderlyingEmotion = emotionsPerEntry.reduce((acc, { entry }) => {
  // * each entry is { emotion, strength, description, ctime }. Destructure and iterate over it
  entry.forEach(({ emotion, strength, description, ctime }) => { 
    // * underlyingEmotion will have the value of the top level emotion
    const underlyingEmotion = emotionMapping[emotion];
    // * checks if underlying emotion is "known" inside the mapping 
    if (underlyingEmotion) {
      // * check if there was an entry before, if not instantiate it.
      if (!acc[underlyingEmotion]) {
        acc[underlyingEmotion] = [];
      }
      // * push the emotion under its category
      acc[underlyingEmotion].push({ emotion, strength, description, ctime });
    } else { // * if its not a known emotion (declared in the object), create it.
      if (!acc['unknown']) {
        acc['unknown'] = [];
      }
      acc['unknown'].push({ emotion, strength, description, ctime });
    }
  });
  return acc;
}, {});

// * Sort entries by date within each emotion group
for (const emotion in groupedByUnderlyingEmotion) {
  groupedByUnderlyingEmotion[emotion].sort((a, b) => new Date(a.ctime) - new Date(b.ctime));
}

// console.log(JSON.stringify(groupedByUnderlyingEmotion, null, 2));

// * sample code that uses console log instead of obsidian 
// for (const emotion in groupedByUnderlyingEmotion) {
//   console.log(`Emotion: ${emotion}`);
//   groupedByUnderlyingEmotion[emotion].forEach(({ emotion, strength, description, ctime }) => {
//     console.log(`  - ${emotion} ${strength}: ${description} (ctime: ${ctime})`);
//   });
// }


for (const emotion in groupedByUnderlyingEmotion) {
  // console.log(`Emotion: ${emotion}`);
  dv.header(2, `${emotion}`);
  groupedByUnderlyingEmotion[emotion].forEach(({ emotion, strength, description, ctime }) => {
    // console.log(`  - ${emotion} ${strength}: ${description} (ctime: ${ctime})`);
    dv.header(3, `${emotion} - ${strength}`);
    dv.paragraph(`${description}`);
  });
}

console.log("DONE SCRIPT")