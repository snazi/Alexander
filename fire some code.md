```meta-bind-button
label: RUN DataviewJS
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: command
    command: dataview:dataview-force-refresh-views
```

```dataviewjs
await dv.view("sandbox_code/get_all_notes_with_feelings", {testVar: 'should see this'})
```
