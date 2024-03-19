import React, { useEffect } from 'react';
import { Avatar, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export default function Reference () {
  const navigate = useNavigate();
  
  useEffect(() => {
    !localStorage.getItem("authToken")? navigate("/login") : navigate("/Reference")
  },[]);

  const data = [
    <a href="https://www.cambridgeinternational.org/Images/414438-2020-2022-syllabus.pdf">2020-2022 IGCSE Additional Mathematics Syllabus</a>,
    <a href="https://bestexamhelp.com/exam/cambridge-igcse/mathematics-additional-0606/index.php">bestexamhelp.com (Collection of past papers)</a>,
    <a href="https://www.blitznotes.org/ig/addmath/index.html#matrices">Blitznotes Add math notes (Notes based on the old syllabus)</a>,
    <a href="https://mmerevise.co.uk/gcse-maths-revision/"> MME revise website (Contains past papers and notes)</a>,
    <a href="https://papers.xtremepape.rs/index.php?dirpath=./CAIE/IGCSE/Mathematics+-+Additional+%280606%29/&order=0">Xtremepapers (Collection of past papers)</a>,
  ]
  return (
    <>
      <div>
        <Row span={24}>
          <Col span={24}>
            <Text>
              <h1>List of other past paper websites!</h1>
            </Text>
          </Col>

          {data.map((el, ind) => (
            <>
              <Col span={24}>
                <div
                  style={{
                    backgroundColor: '#eeeeee',
                    width: '20%',
                    textAlign: 'center',
                    padding: '50px 0px',
                    borderRadius: 20
                  }}
                >
                
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: "bold"
                    }}
                  >
                    {el}
                  </div>
                </div>
                <br/>
              </Col>
            </>
          ))}
        </Row>
      </div>
    </>
    );
};