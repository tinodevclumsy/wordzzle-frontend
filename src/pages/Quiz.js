/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { getQuizList } from '../lib/api/word';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import SubmitModal from '../components/QuizSubmitModal';
import Layout from '../layout';

const Badge = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: #fff;
  background-color: #2ecc71;
`;

const Answer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1500px;
  margin: 50px auto;
`;

const Nav = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: calc(100% - 64px);
  padding: 0 10px;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const NavButton = `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
`;

const NavPrev = styled.div`
  ${NavButton}
  left: 0;
`;

const NavNext = styled.div`
  ${NavButton}
  right: 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

const Quiz = () => {
  const [list, setList] = useState([]);
  const [sheet, setSheet] = useState(Array(10).fill(''));
  const [number, setNumber] = useState(0);
  const [showModal, setModal] = useState(false);

  const onInputChange = (e) => {
    setSheet((prev) => {
      return prev.map((item, index) => {
        if (index === number) {
          return e.target.value;
        }
        return item;
      });
    });
  };

  useEffect(() => {
    getQuizList()
      .then((response) => {
        setList(response.data.words);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Layout style={{ position: 'relative' }}>
      {list.length && (
        // <Container>
        <>
          <Badge>{number + 1}</Badge>
          <Answer>
            <Input
              showCount={true}
              maxLength={list[number].title.length}
              value={sheet[number]}
              size="large"
              onChange={(e) => onInputChange(e)}
            />
          </Answer>
          <Nav>
            {number !== 0 ? (
              <NavPrev>
                <Button
                  shape="circle"
                  icon={<LeftOutlined />}
                  onClick={() => setNumber((prev) => prev - 1)}
                />
              </NavPrev>
            ) : (
              <div></div>
            )}
            <h2 style={{ color: '#fff' }}>
              {list[number].meaning.map((item, mIndex) => {
                return mIndex === list[number].meaning.length - 1
                  ? item.value
                  : `${item.value}, `;
              })}
            </h2>
            {number !== list.length - 1 ? (
              <NavNext>
                <Button
                  shape="circle"
                  icon={<RightOutlined />}
                  onClick={() => setNumber((prev) => prev + 1)}
                />
              </NavNext>
            ) : (
              <div></div>
            )}
          </Nav>
          {number === list.length - 1 && (
            <ButtonContainer>
              <Button onClick={() => setModal(true)} size="large">
                Submit
              </Button>
            </ButtonContainer>
          )}
          <SubmitModal
            open={showModal}
            list={list}
            sheet={sheet}
            onCancel={() => setModal(false)}
          />
        </>
        // </Container>
      )}
    </Layout>
  );
};

export default Quiz;
