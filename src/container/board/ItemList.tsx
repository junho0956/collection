import styled from "styled-components";
import Item from "./Item";
import Title from "./Title";

const ItemList = ({data}:{data:BoardStateType}) => {
  return (
    <Container data-id={data.id} className="boardItemList">
      <Title title={data.title} length={data.contents.length} />
      <ItemLists>
        {data.contents.map(v => (
          <Item key={v.id} data={v} />
        ))}
      </ItemLists>
    </Container>
  );
};

export default ItemList;

const Container = styled.div`
  background-color: #ebebeb;
  margin-right: 50px;
  border-radius: 5px;
`

const ItemLists = styled.ul`
  display: flex;
  flex-direction: column;
`
