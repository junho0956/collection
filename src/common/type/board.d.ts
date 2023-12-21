type BoardContentType = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  avatar: string;
}

type BoardStateType = {
  id: string;
  title: string;
  contents: BoardContentType[];
}

type SwitchBoardType = {
  destListId: string;
  destListItemId: string;
  moveItemListId: string;
  moveItem: BoardContentType;
}