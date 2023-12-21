// ----- board -----

import {nanoid} from "@reduxjs/toolkit";
import {faker} from "@faker-js/faker";
import {getRandomColor} from "./utils";

export const boardInitState:BoardStateType[] = Array(3).fill(true).map(() => {
  return {
    id: nanoid(),
    title: faker.lorem.slug(1),
    contents: Array(6).fill(true).map(() => {
      return {
        id: nanoid(),
        content: faker.lorem.paragraphs(1),
        author: faker.name.findName(),
        createdAt: String(faker.date.recent(30).toLocaleString()),
        avatar: faker.image.image(25, 25),
      }
    })
  }
})

export function boardSwitchState(state:BoardStateType[], action:SwitchBoardType):BoardStateType[] {
  if (
    (action.moveItemListId === action.destListId) &&
    (action.destListItemId === action.moveItem.id)
  ) return state;

  if (
    (action.moveItemListId === action.destListId) &&
    (action.destListItemId !== action.moveItem.id)
  ) {
    return state.map(v => {
      if (v.id !== action.moveItemListId) return v;

      let temp = v.contents;
      temp = temp.filter(vc => vc.id !== action.moveItem.id);
      let did = v.contents.findIndex(vc => vc.id === action.destListItemId);
      temp = [
        ...temp.slice(0, did+1),
        action.moveItem,
        ...temp.slice(did+1, temp.length)
      ]

      return {
        ...v,
        contents: temp
      }
    })
  }

  return state.map(v => {
    if (v.id === action.moveItemListId) {
      return {
        ...v,
        contents: v.contents.filter(vc => vc.id !== action.moveItem.id)
      }
    }
    if (v.id === action.destListId) {
      let idx = 0;
      v.contents.forEach((vc, index) => {
        if (vc.id === action.destListItemId) idx = index;
      })
      return {
        ...v,
        contents: [
          ...v.contents.slice(0, idx + 1),
          action.moveItem,
          ...v.contents.slice(idx + 1, v.contents.length)
        ]
      }
    }
    return v;
  })
}

// ----- slider -----

export const basicSliderData = Array(5).fill(true).map((_, idx) => (
  {id:idx, color:getRandomColor(), text:(idx+1).toString()}
));