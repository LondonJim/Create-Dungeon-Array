# Dungeon Array Creator

Returns a ready made dungeon based on settings.

To use level creator:

`dungeonLvl = new CreateDungeonLvl`

Default settings:
```
width: 20
height: 13
maximum hall length: 15
number of added halls: 30
halls up to the maximum length: true
chance of 3x3 room being created: 30%
chance of door being created when available: 10%
total number of items: 4
```

Change defaults:

`dungeonLvl = new CreateDungeonLvl(15, 15, 10, 40, false, 40, 15, 8)`

creates a dungeon level 15x15, maximum hall length of 15, 40 halls in total, halls will always be 15 in length, 40% chance of 3x3 room created on an square created where available, 15% chance of door created where available, 8 items are randomly added)

Array numbers:
```
0 = empty
1 = wall
2 = door
3 = item
4 = entrance
5 = exit
```


Notes:
The edges of the dungeon are all enclosed
Percentage chances based on available spots for room and doors (eg. doors need wall either side of them on one axis and empty on either side of the other axis)

#### Example

copy path and file name of `index.html` in browser

 ![Image description](./public/screenshot1.png)

 ![Image description](./public/screenshot2.png)

 ![Image description](./public/screenshot3.png)
