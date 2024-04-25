```meta-bind-button
label: Add Entry
hidden: false
class: ""
tooltip: ""
id: ""
style: default
action:
  type: "replaceSelf"
  replacement: "99 - Meta/00 - Templates/TEMPLATE - new emotion.md"
  templater: true
```

#feeling/<% tp.system.suggester((item) => item, ["Happy", "Sad", "Confused"]) %>