import styled from "styled-components";

const Title = ({title, length}:{title:string, length:number}) => {
  return (
    <Container>
      <span>
        {title}
      </span>
      <span>
        {length}
      </span>
    </Container>
  );
};

export default Title;

const Container = styled.div`
  font-size: 20px;
  color: grey;
  margin: 10px;

  & > :first-child {
    font-weight: 600;
    margin-right: 10px;
  }

  & > :last-child {
    font-weight: 400;
  }
`
