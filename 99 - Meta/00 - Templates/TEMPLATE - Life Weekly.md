# Highlights
## I’ve been grateful for...
```dataviewjs
var currentDate = moment("<%tp.file.creation_date("YYYY-MM-DD")%>").endOf('week');
var startDate = moment("<%tp.file.creation_date("YYYY-MM-DD")%>").endOf('week').subtract(7, "days");

const notes = dv
  .pages('"Journal/daily notes"')
  .where((page) =>
    moment(page.file.ctime.toString()).isBetween(startDate, currentDate)
  );

var cleaned_notes = []

notes.forEach((note) => {
    cleaned_notes.push({
        lists: note.file.lists,
        ctime: note.file.ctime,
        link: note.file.link
    })
})

cleaned_notes = cleaned_notes.sort((a,b) => a.ctime - b.ctime)

cleaned_notes.forEach((note) => {
  var entries = [];
  
  note.lists.forEach((element) => {
    if (element.header.subpath == "What am I grateful for") {
      entries.push(element.text);
    }
  });

  if (entries.length > 0){
    dv.header(3, `${note.link}`);
    dv.list(entries);
  }
  
});
```



