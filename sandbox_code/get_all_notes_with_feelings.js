console.log("START SCRIPT")

var dateformat = "MMM DD, YYYY";
var currentDate = moment("2024-04-25").endOf('week');
var startDate = moment("2024-04-25").endOf('week').subtract(6, "days");
var dateToCheck;

console.log(startDate.format('YYYY-MM-DD') + " to " + currentDate.format('YYYY-MM-DD'))

// const pagesWithQuotes = await Promise.all(
//     dv
//       .pages("#feeling")
//       .where((page) =>
//         moment(page.file.ctime.toString()).isBetween(startDate, currentDate)
//       )
//       .map(
//         (pageWithQuote) =>
//           new Promise(async (resolve, reject) => {
//             const content = await dv.io.load(pageWithQuote.file.path);
//             resolve({
//               link: pageWithQuote.file.link,
//               content,
//               ctime: pageWithQuote.file.ctime
//             });
//           })
//       )
//   );


const pagesWithQuotes = await Promise.all(
    dv
      .pages('"08 - Journals/Life/Daily/2024/April"')
      .map(
        (pagewithQuote) => {
            console.log(pagewithQuote.file.frontmatter)
        }
      )
  );

// console.log(pagesWithQuotes)
console.log("DONE SCRIPT")