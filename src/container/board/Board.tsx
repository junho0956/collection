import ItemList from "./ItemList";
import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {boardInitState, boardSwitchState} from "../../common/db";

interface IMoveItem {
  moveItem: BoardContentType;
  moveItemListId: string;
}

const Board = () => {
  const [boardState, setStateBoardState] = useState<BoardStateType[]>(boardInitState);
  const containerRef = useRef<HTMLDivElement>(null);
  const List = useRef<HTMLCollection>();
  const moveItem = useRef<IMoveItem|null>(null);

  useEffect(() => {
    const allData = containerRef.current?.children;
    List.current = allData;
  }, [boardState]);
  useEffect(() => {
    let onHoverItem:Element|null;
    const listenMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const boardItem = target.closest('.boardItem');
      const boardItemList = boardItem?.closest('.boardItemList');

      if (boardItemList && boardItem && boardItemList.contains(boardItem)) { 
        const moveItemId = (boardItem as HTMLLIElement).dataset.id; 
        const ListId = (boardItemList as HTMLUListElement).dataset.id as string;
        let moveItemData:BoardContentType|undefined;

        boardState.forEach(v => {
          if (v.id === ListId) {
            v.contents.forEach(vc => {
              if (vc.id === moveItemId) {
                moveItemData = vc;
              }
            })
          }
        });

        const movingItem = boardItem.children[1]; // drag & drop 되는 엘리먼트
        document.body.append(movingItem);

        (movingItem as HTMLDivElement).style.position = 'absolute';
        (movingItem as HTMLDivElement).style.display = 'block';
        (movingItem as HTMLDivElement).style.zIndex = '1000';
        (movingItem as HTMLDivElement).style.opacity = '0.5';
        (movingItem as HTMLDivElement).style.top = e.pageY - (movingItem as HTMLDivElement).offsetHeight / 2 + 'px';
        (movingItem as HTMLDivElement).style.left = e.pageX - (movingItem as HTMLDivElement).offsetWidth / 2 + 'px';

        const initPrevListenSwitch = (str:string) => {
          moveItem.current = null;
          (movingItem as HTMLDivElement).removeEventListener('mouseup', listenMouseUp);
          (movingItem as HTMLDivElement).removeEventListener('mouseleave', listenMouseLeave);
          (movingItem as HTMLDivElement).style.display = 'none';
          window.removeEventListener('scroll', listenScroll);
          boardItem.appendChild(movingItem);
          List.current && (
            Array.from(List.current).forEach(container => {
              Array.from((container.children[1].children as HTMLCollection)).forEach((li:Element) => {
                li.classList.remove('switch');
              })
            })
          )
          onHoverItem = null;
        }

        const listenMouseUp = (e: MouseEvent) => {
          if (!onHoverItem) initPrevListenSwitch('up');
          else {
            let { top, left, right, bottom } = onHoverItem.getBoundingClientRect();
            top += window.scrollY;
            bottom += window.scrollY;
            const x = e.pageX, y = e.pageY;
            if ((top <= y && y <= bottom) && (left <= x && x <= right)) {
              const destListItemId = (onHoverItem as HTMLLIElement).dataset.id as string;
              const listParent = onHoverItem.closest('.boardItemList');
              if (!listParent) initPrevListenSwitch('up');
              else {
                const destListId = (listParent as HTMLDivElement).dataset.id as string;
                const payload = {
                  destListId,
                  destListItemId,
                  moveItem: moveItem.current?.moveItem as BoardContentType,
                  moveItemListId: moveItem.current?.moveItemListId as string
                }
                initPrevListenSwitch('up');
                setStateBoardState(boardSwitchState(boardState, payload));
              }
            } else {
              initPrevListenSwitch('up');
            }
          }
        }

        const listenScroll = (e: Event) => {
          
        }
        
        const listenMouseLeave = (e: MouseEvent) => {
          initPrevListenSwitch('leave');
        }

        const mouseContainItem = (li:Element, pageX:number, pageY:number) => {
          let { top, left, right, bottom } = li.getBoundingClientRect();
          top += window.scrollY;
          bottom += window.scrollY;
          if ((top <= pageY && pageY <= bottom) && (left <= pageX && pageX <= right)) {
            onHoverItem = li;
            return true;
          }
          return false;
        }
        
        const moveAt = (pageX:number, pageY:number) => {
          (movingItem as HTMLDivElement).style.left = pageX - (movingItem as HTMLDivElement).offsetWidth / 2 + 'px';
          (movingItem as HTMLDivElement).style.top = pageY - (movingItem as HTMLDivElement).offsetHeight / 2 + 'px';
        }

        const onMouseMove = (e: MouseEvent) => {
          moveAt(e.pageX, e.pageY);
          List.current && (
            Array.from(List.current).forEach(container => {
              Array.from((container.children[1].children as HTMLCollection)).forEach((li:Element) => {
                if (mouseContainItem(li, e.pageX, e.pageY)) {
                  li.classList.add('switch');
                } else {
                  li.classList.remove('switch');
                }
              })
            })
          )
        }
        
        (movingItem as HTMLDivElement).addEventListener('mouseup', listenMouseUp); // 해당 아이템에 mouseup 이벤트가 동작하면
        (movingItem as HTMLDivElement).addEventListener('mousemove', onMouseMove);
        (movingItem as HTMLDivElement).addEventListener('mouseleave', listenMouseLeave);
        window.addEventListener('scroll', e => listenScroll(e));

        moveItem.current = {
          moveItem: moveItemData as BoardContentType,
          moveItemListId: ListId
        }
      }
    }

    containerRef.current && containerRef.current.addEventListener('mousedown', listenMouseDown);
    return () => { 
      containerRef.current && containerRef.current.removeEventListener('mousedown', listenMouseDown)
    }
  }, [boardState]);

  return (
    <Container>
      <div>Used: javascript</div>
      <div>Todo</div>
      <div>- 맨위에 아이템 넣는 기능 구현</div>
      <div className="board" ref={containerRef}>
        {boardState.map(state => (
          <ItemList key={state.id} data={state} />
        ))}
      </div>
    </Container>
  );
};

export default Board;

const Container = styled.section`
  padding: 20px;
  &>.board {
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
  }
`
