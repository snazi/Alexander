---
date: <%tp.date.now("YYYY-MM-DD")%>T<%tp.date.now("HH:mm")%>
tags:
  - Daily
cssclasses:
  - daily
  <% "- " + tp.date.now("dddd", 0, tp.file.title, "YYYY-MMMM-DD").toLowerCase() %>
---
# DAILY NOTE
## <% tp.date.now("dddd, MMMM Do, YYYY", 0, tp.file.title, "YYYY-MMMM-DD") %>
```calendar-timeline
```
***
### Journal
- 
***
### Emotions