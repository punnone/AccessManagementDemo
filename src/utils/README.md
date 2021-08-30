### Table Data
| id              | name     | faculty\_id | faculty     | field\_id | field                | active | updated    | created    |
| --------------- | -------- | ----------- | ----------- | --------- | -------------------- | ------ | ---------- | ---------- |
| 1234567890123-1 | John Doe | 123456      | Engineering | 123456    | Computer Engineering | 1      | yyyy-mm-dd | yyyy-mm-dd |
| 1234567890123-2 | Jane Doe | 123457      | Engineering | 123457    | Computer Engineering | 1      | yyyy-mm-dd | yyyy-mm-dd |
| 1234567890123-3 | Baby Doe | 123458      | Science     | 123458    | Computer Science     | 1      | yyyy-mm-dd | yyyy-mm-dd |
| 1234567890123-4 | Kid Doe  | 123459      | Science     | 123459    | Computer Science     | 1      | yyyy-mm-dd | yyyy-mm-dd |
| 1234567890123-5 | Anna Doe | 123460      | Science     | 123460    | Mathematics          | 1      | yyyy-mm-dd | yyyy-mm-dd |

### Role
| id  | name      | permissions |
| --- | --------- | ----------- |
| 1   | admin     | แก้ไขได้      |
| 2   | professor | แก้ไขไม่ได้    |
| 3   | student   | เฉพาะสาขา   |
| 4   | guest     | ไม่เห็น       |